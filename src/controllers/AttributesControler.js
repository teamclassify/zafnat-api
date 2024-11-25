import ResponseDataBuilder from "../models/ResponseData.js";
import AttributeService from "../services/AttributesService.js";

class AttributeController {
  constructor() {
    this.attributeService = new AttributeService()
  }

  findAll = async (req, res) => {
    try {
      const { type } = req.query;
      const where = {};
      
      if (type) {
        where.type = type;
      }
      
      const results = await this.attributeService.find(where);

      const data = new ResponseDataBuilder()
        .setData(results)
        .setStatus(200)
        .setMsg("Attributes found")
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

    const result = await this.attributeService.findOne(id);

    if (!result || result?.length === 0) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("Attribute not found")
        .build();

      return res.json(data);
    }

    const data = new ResponseDataBuilder()
      .setData(result)
      .setStatus(200)
      .setMsg("Attribute found")
      .build();

    return res.json(data);
  }

  create = async (req, res) => {
    const body = req.body;

    const result = await this.attributeService.create(body);

    const data = new ResponseDataBuilder()
      .setData(result)
      .setStatus(201)
      .setMsg("Attribute created")
      .build();

    return res.json(data);
  }

  update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const result = await this.attributeService.update(id, body);

    if (!result) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("Attribute not found")
        .build();

      return res.json(data);
    }

    const data = new ResponseDataBuilder()
      .setData(result)
      .setStatus(200)
      .setMsg("Attribute updated")
      .build();

    return res.json(data);
  }
}

export default AttributeController;