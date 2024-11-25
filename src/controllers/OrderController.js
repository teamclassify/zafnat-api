import OrderService from "../services/OrderService.js";
import ProductSkuService from "../services/ProductSkuService.js";
import OrderItemService from "../services/OrderItemService.js";

class OrderController {
    constructor() {
        this.orderService = new OrderService();
        this.productSkuService = new ProductSkuService();
        this.orderItemService = new OrderItemService();
    }

    findAll = async (req, res) => {
        const orders = await this.orderService.find({
            include: {
                user: true,
                products: true,
            },
        });
        res.json(orders);
    }

    findByUser = async (req, res) => {
        const orders = await this.orderService.find({
            userId: req.id,
            include: {
                user: true,
                products: true,
            },
        });
        res.json(orders);
    };

    create = async (req, res) => {
        if(!req.body.order_items || req.body.order_items.length === 0) {
            return res.status(400).json({ msg: "Order items are required" });
        }
        const { user_id, status, is_wholesale, order_items } = req.body;

        const validate = await this.validateStock(order_items);
        if(!validate) return res.status(400).json({ msg: "Insufficient stock" });
        
        let total = 0;
        for (const item of order_items) {
            total += item.price * item.quantity;
        }
        const order = await this.orderService.create({
            user_id,
            status,
            is_wholesale,
            total
        });
        let ordered_items = [];
        for (const item of order_items) {
            await this.productSkuService.decreaseStock(item.id, item.quantity);
            ordered_items.push(await this.orderItemService.create({
                product_sku_id: item.id,
                order_id: order.id,
                quantity: item.quantity,
                price: item.price
            }));
        }
        const orderWithItems = { ...order, ordered_items };
        res.status(201).json(orderWithItems);
    };

    validateStock = async (orderItems) => {
        for (const item of orderItems) {
            const product = await this.productSkuService.findOne(item.id);
            if (!product || product.quantity < item.quantity) {
                return false;
            }
        }
        return true;
    };
}

export default OrderController;