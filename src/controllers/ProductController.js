import ResponseDataBuilder from "../models/ResponseData.js";
import ProductService from "../services/ProductService.js";
import prisma from "../config/prisma.js";

class ProductController {
  constructor() {
    this.productService = new ProductService()
  }

  findAll = async (req, res) => {
   try {
     const { status, name, sizes, colors, categories } = req.query;

     const where = {}
     
     if (status !== "") {
       where.status = Boolean(status);
     }
     
      if (name !== "") {
        where.name = {
          contains: name,
          mode: 'insensitive',
        }
      }
      
     const products = await this.productService.find(where, 1, colors, sizes, categories);

     const data = new ResponseDataBuilder()
       .setData(products)
       .setStatus(200)
       .setMsg("Products found")
       .build();

     return res.json(data);
   } catch (err) {
     console.log(err);
     const data = new ResponseDataBuilder()
       .setData(null)
       .setStatus(500)
       .setMsg("Internal server error")
       .build();

     return res.json(data);
   }
  };

  findOne = async (req, res) => {
    const id = req.params.id;

    const product = await this.productService.findOne(id);

    if (!product || product?.length === 0) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("Product not found")
        .build();

      return res.json(data);
    }

    const data = new ResponseDataBuilder()
      .setData(product)
      .setStatus(200)
      .setMsg("Product found")
      .build();

    return res.json(data);
  }
  
  async create(req, res) {
    const data = req.body;

    const productCreated = await this.productService.create(data);

    const dataResponse = new ResponseDataBuilder()
      .setData(productCreated)
      .setStatus(201)
      .setMsg("Product created")
      .build();

    return res.json(dataResponse);
  }
  
  async delete(req, res) {
    const id = req.params.id;

    const productDeleted = await this.productService.delete(id);

    if (!productDeleted) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("Product not found")
        .build();

      return res.json(data);
    }

    const data = new ResponseDataBuilder()
      .setData(productDeleted)
      .setStatus(200)
      .setMsg("Product deleted")
      .build();

    return res.json(data);
  }
  
  async update(req, res) {
    const id = req.params.id;
    const {
      name,
      description,
      status,
    } = req.body;
    
    if (!name || !description) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(400)
        .setMsg("All fields are required")
        .build();

      return res.json(data);
    }
    
    console.log(status)

    const productUpdated = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        status
      }
    })

    if (!productUpdated) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("Product not found")
        .build();

      return res.json(data);
    }

    const dataResponse = new ResponseDataBuilder()
      .setData(productUpdated)
      .setStatus(200)
      .setMsg("Product updated")
      .build();

    return res.json(dataResponse);
  }
}

export default ProductController;