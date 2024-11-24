import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkPermission from "../middlewares/rbac.js";

const categoryRouter = express.Router();
const controller = new CategoryController();

categoryRouter.get("/", controller.findAll);
categoryRouter.get("/:id", controller.findOne);
categoryRouter.post("/", verifyToken, checkPermission("ADMIN"), controller.create);
categoryRouter.put("/:id", verifyToken, checkPermission("ADMIN"), controller.update);

export default categoryRouter;
