import prisma from "../config/prisma.js";

class CartProductService {

    async find(where) {
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
                    photos: true
                  }
                }
              }
            }
          }
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
      const {
        productId,
        userId,
        quantity
      } = data;
      
        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            },
          })
      
        const cartProductCreated = await prisma.cartProduct.create({
            data: {
              quantity,
              
              product_sku: {
                connect: {
                  id: productId
                }
              },
              
              cart: {
                connect: {
                  id: cart.id
                }
              }

            },
        });

        return cartProductCreated;
    }

    async delete(id, cartId) {
        const cartProductDeleted = await prisma.cartProduct.delete({
            where: {
                id: id,
            }
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
