import CartProductService from "../services/CartProductService.js";

class CartProductController {
    constructor() {
        this.cartProductService = new CartProductService();
    }

    findAll = async (req, res) => {
        const cartProducts = await this.cartProductService.find({});
        res.status(200).json(cartProducts);
    };

    findOne = async (req, res) => {
        const id = req.params.id;
        const cartProduct = await this.cartProductService.findOne(id);
        res.status(200).json(cartProduct);
    };

    create = async (req, res) => {
        const data = req.body;

        const cartProduct = await this.cartProductService.create(data);

        res.status(201).json(cartProduct);
    };

    delete = async (req, res) => {
        const id = parseInt(req.params.id);
        const cartId = req.id;
        const cartProduct = await this.cartProductService.delete(id, cartId);

        if (!cartProduct) {
            return res.status(404).json({ msg: "Cart product not found" });
        }

        res.json({ msg: "Cart product deleted" });
    };

    update = async (req, res) => {
        const id = parseInt(req.params.id);
        const cartId = req.id;
        const data = req.body;
        const cartProduct = await this.cartProductService.update(id, cartId, data);

        if (!cartProduct) {
            return res.status(404).json({ msg: "Cart product not found" });
        }

        res.json(cartProduct);
    };

}

export default CartProductController;