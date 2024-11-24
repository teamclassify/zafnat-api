import ResponseDataBuilder from "../models/ResponseData.js";
import CategoryService from "../services/CategoryService.js";

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService()
  }

  findAll = async (req, res) => {
    try {
      const categories = await this.categoryService.find({});

      const data = new ResponseDataBuilder()
        .setData(categories)
        .setStatus(200)
        .setMsg("Categories found")
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

    const category = await this.categoryService.findOne(id);

    if (!category || category?.length === 0) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("Category not found")
        .build();

      return res.json(data);
    }

    const data = new ResponseDataBuilder()
      .setData(category)
      .setStatus(200)
      .setMsg("Category found")
      .build();

    return res.json(data);
  }
  
  create = async (req, res) => {
    const category = req.body;

    const createdCategory = await this.categoryService.create(category);

    const data = new ResponseDataBuilder()
      .setData(createdCategory)
      .setStatus(201)
      .setMsg("Category created")
      .build();

    return res.json(data);
  }
  
  update = async (req, res) => {
    const id = req.params.id;
    const category = req.body;

    const updatedCategory = await this.categoryService.update(id, category);

    if (!updatedCategory) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("Category not found")
        .build();

      return res.json(data);
    }

    const data = new ResponseDataBuilder()
      .setData(updatedCategory)
      .setStatus(200)
      .setMsg("Category updated")
      .build();

    return res.json(data);
  }
}

export default CategoryController;