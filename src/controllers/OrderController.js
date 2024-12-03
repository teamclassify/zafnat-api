import OrderService from "../services/OrderService.js";
import ProductSkuService from "../services/ProductSkuService.js";
import OrderItemService from "../services/OrderItemService.js";
import { Preference, MerchantOrder, Payment } from "mercadopago";
import client from "../config/mercadopago.js";
import {URL_BACK, URL_FRONT} from "../config/index.js";
import prisma from "../config/prisma.js";

class OrderController {
    constructor() {
        this.orderService = new OrderService();
        this.productSkuService = new ProductSkuService();
        this.orderItemService = new OrderItemService();
    }

    findAll = async (req, res) => {
        const orders = await this.orderService.find({});
        res.json(orders);
    }
    
    findById = async (req, res) => {
        const order = await prisma.order.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
      
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.json(order);
    }

    findByUser = async (req, res) => {
        const orders = await this.orderService.find({
            where: {
                user: {
                    id: req.body.user_id,
                },
            },
        });
        res.json(orders);
    };

    create = async (req, res) => {
        if(!req.body.order_items || req.body.order_items.length === 0) {
            return res.status(400).json({ msg: "Order items are required" });
        }
        if(!req.body.address_id) {
            return res.status(400).json({ msg: "Address is required" });
        }
        const { user_id, address_id, is_wholesale, order_items } = req.body;

        const validate = await this.validateStock(order_items);
        if(!validate) return res.status(400).json({ msg: "Insufficient stock" });
        
        // console.log(order_items)
        
        let total = 0.0;
        for (const item of order_items) {
            total += item.product_sku.price * item.quantity;
        }
        const order = await this.orderService.create({
            address_id,
            user_id,
            status: "waiting_shipment",
            is_wholesale: false,
            total: total,
        });
        
        const invoice = await prisma.invoice.create({
            data: {
                order_id: order.id,
                amount: total,
                status: "paid",
                transaction_id: "test",
                bank: "mercadopago"
            }
        })
        
       const preference = new Preference(client);

        //crear preferencia en MercadoPago
      preference.create({
          body: {
            items: order_items.map(item => ({
              title: item.product_sku.sku,
              unit_price: item.product_sku.price,
              quantity: item.quantity,
              currency_id: "COP"
            })),

            back_urls: {
              "success": `${URL_FRONT}/pago-realizado`,
              "failure": `${URL_FRONT}/pago-realizado`,
              "pending": `${URL_FRONT}/pago-realizado`
            },
            
            // notification_url: `${URL_BACK}/orders/webhook`,
            external_reference: invoice.order_id,
          },
        })
        .then(async (response) => {
          console.log(response);
          
          await prisma.invoice.update({
            where: {
              id: invoice.id
            },
            data: {
              transaction_id: response.id
            }
          })

          let ordered_items = [];
          for (const item of order_items) {
            await this.productSkuService.decreaseStock(item.id, item.quantity);
            ordered_items.push(await this.orderItemService.create({
              product_sku_id: item.product_sku_id,
              order_id: order.id,
              quantity: item.quantity,
              price: item.product_sku.price
            }));
          }
          
          const orderWithItems = { ...order, ordered_items, transaction: response };
          res.status(201).json(orderWithItems);
        } )
        .catch(err => {
          console.log(err);
          res.status(500).json({ msg: "Error creating preference" });
        } );
      
    };

    validateStock = async (orderItems) => {
        for (const item of orderItems) {
            const product = await this.productSkuService.findOne(item.product_sku_id);
            if (!product || product.quantity < item.quantity) {
                return false;
            }
        }
        return true;
    };
    
    async webhook(req, res) {
      try {
        const body = req.body;
        if (body.topic !== null && body.topic !== undefined && body.topic === 'merchant_order') {
          const merchantOrder = new MerchantOrder(client);
          const segments = body.resource.split('/');
          const ordenDePago = await merchantOrder.get({ merchantOrderId: segments[segments.length - 1] });
          const status = ordenDePago.status;
          const idFactura = ordenDePago.external_reference;
          // const factura = await facturaService.findOne(idFactura);
          
          const factura = await prisma.invoice.findUnique({
            where: {
              id: idFactura
            }
          });
          
          console.log(factura)
          console.log(status)
        }
        res.json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
      }
    }
}

export default OrderController;