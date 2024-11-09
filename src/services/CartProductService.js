import prisma from "../config/prisma.js";

class CartProductService {

    async find(where) {
        const cartProducts = await prisma.cartProduct.findMany({
            where,
        });

        return cartProducts;
    }

    async findOne(id) {
        const cartProduct = await prisma.cartProduct.findUnique({
            where: {
                id: id,
            },
        });

        return cartProduct;
    }

    async create(data) {
        const cartProductCreated = await prisma.cartProduct.create({
            data,
        });

        return cartProductCreated;
    }

    async delete(id, cartId) {
        const cartProductDeleted = await prisma.cartProduct.delete({
            where: {
                id: id,
                cartId: cartId,
            }
        });
        return cartProductDeleted;
    }

    async update(id, cartId, data) {
        const cartProductUpdated = await prisma.cartProduct.update({
            where: {
                id: id,
                cartId: cartId,
            },
            data,
        });

        return cartProductUpdated;
    }
}

export default CartProductService;
