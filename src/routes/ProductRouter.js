import express from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = express.Router();
const controller = new ProductController();

productRouter.get("/", controller.findAll);
productRouter.get("/:id", controller.findOne);

export default productRouter;
