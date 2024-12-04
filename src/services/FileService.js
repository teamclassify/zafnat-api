import prisma from "../config/prisma.js";

class FileService {
  async create(data, order, id) {
    const productionOrder = await prisma.productionOrder.create({
      data: {
        prod_id: order,
        userId: id,
      },
    });

    console.log(this.getProductCategory(data))

    await this.createCategories(this.getCategories(data));
    await this.createProducts(this.getProducts(data));
    await this.createAttributes(this.getAttributes(data));
    await this.createProductCategory(this.getProductCategory(data));
    await this.createProductSku(data);
    const productOrderCreated = await this.createProductOrder(data, order);

    return productOrderCreated;
  }

  async createProductOrder(data, order) {
    let productOrderPromises = [];
    for (let product of data) {
      productOrderPromises.push(
        prisma.productOnProductionOrder
          .create({
            data: {
              product: {
                connect: {
                  sku: product.sku,
                },
              },
              productionOrder: {
                connect: {
                  prod_id: order,
                },
              },
              quantity: product.quantity,
              price: product.price,
            },
            include: {
              product: true,
              productionOrder: true,
            },
          })
          .then((data) => {
            console.log(data);
            console.log("ProductOnProductionOrder creado");
          })
          .catch((err) => {
            console.log(err);
            console.log("Error creando ProductOnProductionOrder");
          })
      );
    }
    return await Promise.all(productOrderPromises);
  }

  async createProductSku(data) {
    let productSkuPromises = [];
    for (let product of data) {
      productSkuPromises.push(
        prisma.productSku
          .upsert({
            where: {
              sku: product.sku,
            },
            update: {
              quantity: {
                increment: product.quantity,
              },
              price: product.price,
            },
            create: {
              product: {
                connect: {
                  name: product.name,
                },
              },
              size_attribute: {
                connect: {
                  type: "size",
                  value: product.size,
                },
              },
              color_attribute: {
                connect: {
                  type: "color",
                  value: product.color,
                },
              },
              sku: product.sku,
              quantity: product.quantity,
              price: product.price,
            },
          })
          .then((data) => {
            console.log(data);
            console.log("ProductSku creado");
          })
          .catch((err) => {
            console.log(err);
            console.log("Error creando ProductSku");
          })
      );
    }
    return await Promise.all(productSkuPromises);
  }

  async createProductCategory(productCategory) {
    let pcPromises = [];
    for (let pc of productCategory) {
      let str = pc.split(";");
      pcPromises.push(
        prisma.productOnCategory
          .upsert({
            where: {
              name: str[0] + " " + str[1],
              product: {
                name: str[0],
              },
              category: {
                name: str[1],
              },
            },
            update: {},
            create: {
              name: str[0] + " " + str[1],
              product: {
                connect: {
                  name: str[0],
                },
              },
              category: {
                connect: {
                  name: str[1],
                },
              },
            },
          })
          .then((data) => {
            console.log(data);
            console.log("ProductOnCategorie creado");
          })
          .catch((err) => {
            console.log(err);
            console.log("Error creando ProdcutOnCategorie");
          })
      );
    }
    return await Promise.all(pcPromises);
  }

  async createAttributes(attributes) {
    let attributePromises = [];
    for (let attribute of attributes) {
      let str = attribute.split(";");
      attributePromises.push(
        prisma.productAttribute
          .upsert({
            where: {
              type: str[0],
              value: str[1],
            },
            update: {},
            create: {
              type: str[0],
              value: str[1],
            },
          })
          .then((data) => {
            console.log(data);
            console.log("ProdcutAttribute creado");
          })
          .catch((err) => {
            console.log(err);
            console.log("Error creando ProductAttribute");
          })
      );
    }
    return await Promise.all(attributePromises);
  }

  async createProducts(products) {
    let productPromises = [];
    for (let product of products) {
      productPromises.push(
        prisma.product
          .upsert({
            where: {
              name: product,
            },
            update: {},
            create: {
              name: product,
            },
          })
          .then((data) => {
            console.log(data);
            console.log("Product creado");
          })
          .catch((err) => {
            console.log(err);
            console.log("Error creando Product");
          })
      );
    }
    return await Promise.all(productPromises);
  }

  async createCategories(categories) {
    let categoryPromises = [];

    console.log("=============")
    console.log(categories)
    console.log("=============")

    for (let category of categories) {
      categoryPromises.push(
        prisma.category
          .upsert({
            where: {
              name: category,
            },
            update: {},
            create: {
              name: category,
              description: category
            },
          })
          .then((data) => {
            console.log(data);
            console.log("Categoria creado");
          })
          .catch((err) => {
            console.log(err);
            console.log("Error creando Categoria");
          })
      );
    }
    return await Promise.all(categoryPromises);
  }

  getProductCategory(data) {
    let productCategory = new Set();
    for (let row in data) {
      productCategory.add(data[row].name + ";" + data[row].category_name);
    }
    return productCategory;
  }

  getProducts(data) {
    let products = new Set();
    for (let row in data) {
      products.add(data[row].name);
    }
    return products;
  }

  getAttributes(data) {
    let attributes = new Set();
    for (let row in data) {
      attributes.add("Talla;" + data[row].size);
      attributes.add("Color;" + data[row].color);
    }
    return attributes;
  }

  getCategories(data) {
    let categories = new Set();
    for (let row in data) {
      categories.add(data[row].category_name);
    }
    return categories;
  }
}

export default FileService;
