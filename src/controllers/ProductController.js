import ResponseDataBuilder from "../models/ResponseData.js";
import ProductService from "../services/ProductService.js";

class ProductController {
  constructor() {
    this.productService = new ProductService()
  }

  findAll = async (req, res) => {
    const products = await this.productService.find({
    });

    const data = new ResponseDataBuilder()
      .setData(products)
      .setStatus(200)
      .setMsg("Products found")
      .build();

    return res.json(data);
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
}

export default ProductController;