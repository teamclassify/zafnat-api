import express from "express";
import AttributeController from "../controllers/AttributesControler.js";

const attributeRouter = express.Router();
const controller = new AttributeController();

attributeRouter.get("/", controller.findAll);
attributeRouter.get("/:id", controller.findOne);

export default attributeRouter;
