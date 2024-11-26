import CartProductService from "../services/CartProductService.js";
import prisma from "../config/prisma.js";


class CartProductController {
    constructor() {
        this.cartProductService = new CartProductService();
    }

    findAll = async (req, res) => {
        const userId = req.id;
      
        const cartProducts = await this.cartProductService.find({
          userId: userId
        });
        
        
        res.status(200).json(cartProducts);
    };

    findOne = async (req, res) => {
        const id = req.params.id;
        const cartProduct = await this.cartProductService.findOne(id);
        res.status(200).json(cartProduct);
    };

    create = async (req, res) => {
        const {
          productId,
          quantity
        } = req.body;

        const cartProduct = await this.cartProductService.create({
          productId,
          userId: req.id,
          quantity
        });

        res.status(201).json(cartProduct);
    };

    delete = async (req, res) => {
        const id = parseInt(req.params.id);
        const cartProduct = await this.cartProductService.delete(id);

        if (!cartProduct) {
            return res.status(404).json({ msg: "Cart product not found" });
        }

        res.json({ msg: "Cart product deleted" });
    };

    update = async (req, res) => {
        const id = parseInt(req.params.id);
        const userId = req.id;
        const { quantity } = req.body;
        
        const cartProduct = await this.cartProductService.update(id, userId, quantity);

        if (!cartProduct) {
            return res.status(404).json({ msg: "Cart product not found" });
        }

        res.json(cartProduct);
    };

}

export default CartProductController;