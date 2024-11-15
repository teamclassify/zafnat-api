import prisma from "../config/prisma.js";

class ProductService {
  constructor() {}

  async find(where, page = 1) {
    const products = await prisma.productSku.findMany({
      where,
      skip: (page - 1) * 10,
      include: {
        product: true,
        photos: true,
      }
    });

    return products;
  }

  async findOne(id) {
    try {
      const product = await prisma.productSku.findMany({
        where: {
          product_id: parseInt(id),
        },
        include: {
          product: true,
          photos: true,
          color_attribute: true,
          size_attribute: true,
        }
      });

      return product;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async create(data) {
    const productCreated = await prisma.product.create({
      data,
    });

    return productCreated;
  }

  async delete(id) {
    const productDeleted = await prisma.product.delete({
      where: id,
    });

    console.log(productDeleted);

    return { deleted: true };
  }

  async update(id, data) {
    const productUpdated = await prisma.product.update({
      where: {
        id: id,
      },
      data,
    });
    return productUpdated;
  }
}

export default ProductService;
