import ResponseDataBuilder from "../models/ResponseData.js";
import ProductService from "../services/ProductService.js";
import prisma from "../config/prisma.js";

// Ponderaciones para cada atributo
const ATTRIBUTE_WEIGHTS = {
  category: 0.4,
  price_range: 0.2,
  color: 0.4,
};


function  calculateSimilarity(product1, product2) {
  let similarity = 0.0;
  
  //model de producto

  // {
  //  id: 5,
  //   name: 'Short doble tono clásico',
  //   description: 'Short doble tono clásico',
  //   status: true,
  //   createdAt: 2024-11-26T21:41:05.400Z,
  //   categories: [],
  //       ProductSku: [
  //          id: 11,
  //   //       product_id: 5,
  //   //       size_attribute_id: 8,
  //   //       color_attribute_id: 5,
  //   //       sku: 'short-doble-azul-xs',
  //   //       price: 50000,
  //   //       quantity: 200,
  //   //       createdAt: 2024-11-26T21:43:35.267Z,
  //   //       photos: [Array],
  //   //       size_attribute: [Object],
  //   //       color_attribute: [Object]
  //         ]
  // }
  //
  // if (product1.categories.some((c) => product2.categories.some((c2) => c.id === c2.id))) {
  //   similarity += ATTRIBUTE_WEIGHTS.category;
  // }
  
  product1.categories.forEach((c) => {
    product2.categories.forEach((c2) => {
      if (c.category_id === c2.category_id) {
        similarity += ATTRIBUTE_WEIGHTS.category;
      }
    });
  })
  
  console.log(similarity)

  // // if (product1.price === product2.price) {
  // if (product1.ProductSku.some((sku) => product2.ProductSku.some((s) => s.price === sku.price))) {
  //   similarity += ATTRIBUTE_WEIGHTS.price_range;
  // }
  //
  // if (product1.ProductSku.some((sku) => product2.ProductSku.some((s) => s.color_attribute_id === sku.color_attribute_id))) {
  //   similarity += ATTRIBUTE_WEIGHTS.color;
  // }

  return similarity;
}


class RecomendacionesControllers {
  
  constructor() {
    this.productService = new ProductService()
  }

  
  
  async getRecomendaciones(req, res) {
    try {
      const productId = parseInt(req.params.productId);
      const limit = parseInt(req.query.limit) || 5;

      const baseProduct = await prisma.product.findUnique(
        {
          where: {
            id: productId,
          },
          include: {
            categories: true,
            
            ProductSku: {
              include: {
                photos: true,
                size_attribute: true,
                color_attribute: true,
              }
            }
          }
        }
      )
      
      if (!baseProduct) {
        const data = new ResponseDataBuilder()
          .setData(null)
          .setStatus(404)
          .setMsg("Product not found")
          .build();

        return res.json(data);
      }
      
      const products = await prisma.product.findMany({
        include: {
          categories: true,
          
          ProductSku: {
            include: {
              photos: true,
              size_attribute: true,
              color_attribute: true,
            }
          }
        }
      });

      const recommendations = products
        .filter((p) => p.id !== productId)
        .map((p) => {
          console.log(p)
          return {
            id: p.id,
            name: p.name,
            similarity: calculateSimilarity(baseProduct, p),
            ...p
          }
        })
        .filter((p) => p.similarity > 0)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);
      
      const data = new ResponseDataBuilder()
        .setData(recommendations)
        .setStatus(200)
        .setMsg("Products found")
        .build();

      return res.json(data);
    } catch (error) {
      console.log(error)
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(500)
        .setMsg("Internal server error")
        .build();

      return res.json(data);
    }
  }
  
}

export default RecomendacionesControllers;