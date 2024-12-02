import express from "express";
import ProductController from "../controllers/ProductController.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkPermission from "../middlewares/rbac.js";

const productRouter = express.Router();
const controller = new ProductController();

productRouter.get("/",  controller.findAll);
productRouter.get("/:id",controller.findOne);
productRouter.post("/", verifyToken, checkPermission("ADMIN"), controller.create);
productRouter.delete("/:id",verifyToken,checkPermission("ADMIN"),  controller.delete);
productRouter.put("/:id", verifyToken, checkPermission("ADMIN"), controller.update);

export default productRouter;
