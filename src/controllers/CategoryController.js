import CategoryService from "../services/CategoryService";

class CategoryController {
    constructor() {
        this.CategoryService = new CategoryService();
    }

    findAll = async (req, res) => {
        const category = await this.CategoryService.find({});
        res.json(category);
    };

    findOne = async (req, res) => {
        const id = req.params.id;
        const category = await this.CategoryService.findOne(id);
        res.json(category);
    }

    create = async (req, res) => {
        const data = req.body;
        const category = await this.CategoryService.create(data);
        res.json(category);
    }

    update = async (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.body;
        const category = await this.CategoryService.update(id, data);
        res.json(category);
    }
    
    delete = async(req,res) => {
        const id = req.params.id;
        const category = await this.CategoryService.delete(id);
        res.json(category)
    }
}

export default CategoryController;