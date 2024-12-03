import prisma from "../config/prisma.js";

class CartProductService {
  async find(where) {
    try {
      const cartProducts = await prisma.cart.findMany({
        where,

        include: {
          products: {
            include: {
              product_sku: {
                include: {
                  product: true,
                  color_attribute: true,
                  size_attribute: true,
                  photos: true,
                },
              },
            },
          },
        },
      });

      return cartProducts;
    } catch (err) {
      console.log(err);
      console.log("Error obteniedno carrito de compras");
      return;
    }
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
    const { productId, userId, quantity } = data;
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          userId: userId,
        },
      });

      const cartProductCreated = await prisma.cartProduct.create({
        data: {
          quantity,

          product_sku: {
            connect: {
              id: productId,
            },
          },

          cart: {
            connect: {
              id: cart.id,
            },
          },
        },
      });

      return cartProductCreated;
    } catch (err) {
      console.log(err);
      console.log("Error agregando producto al carrito");
      return null;
    }
  }

  async delete(id, cartId) {
    const cartProductDeleted = await prisma.cartProduct.delete({
      where: {
        id: id,
      },
    });
    return cartProductDeleted;
  }

  async update(id, userId, quantity) {
    const cartProductUpdated = await prisma.cartProduct.update({
      where: {
        id: id,
      },
      data: {
        quantity: quantity,
      },
    });

    return cartProductUpdated;
  }
}

export default CartProductService;
