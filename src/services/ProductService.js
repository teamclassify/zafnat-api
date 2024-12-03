import prisma from "../config/prisma.js";

class ProductService {
  constructor() {}

  async find(where, page = 1, colors = [], sizes = [], categories = []) {
    
    const colorsWhere = colors.length > 0 ? colors.map((color) => {
      return {
        color_attribute: {
          value: {
            contains: color,
            mode: 'insensitive',
          }
        }
      }
    }) : [];
    
    const sizesWhere = sizes.length > 0 ? sizes.map((size) => {
      return {
        size_attribute: {
          value: size
        }
      }
    }) : [];
    
    const filter = []

    const data = {
      where,
      skip: (page - 1) * 10,
      include: {
        ProductSku: {
          include: {
            photos: true,
          },

          where: {}
        },
        reviews: true,
        categories: true,
      },
    }
    
    if (colorsWhere.length > 0) {
        filter.push(colorsWhere)
    }
    
    if (sizesWhere.length > 0) {
      filter.push(sizesWhere)
    }
    
    if (filter.length > 0) {
      // data.include.ProductSku.where.AND = filter;
      data.where = {
        ...where,
        ProductSku: {
          some: {
            AND: filter.flat()
          }
        }
      }
    }
    
    if (categories.length > 0) {
      data.where.categories = {
        some: {
          name: {
            in: categories
          }
        }
      }
    }
    
    const products = await prisma.product.findMany(data);

    return products;
  }

  async findOne(id) {
    try {
      const product = await prisma.productSku.findMany({
        where: {
          product_id: parseInt(id),
        },
        include: {
          product: {
            include: {
              categories: true,
            }
          },
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
