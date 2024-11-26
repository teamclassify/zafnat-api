import express from "express";
import OrderController from "../controllers/OrderController.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkPermission from "../middlewares/rbac.js";

const router = express.Router();

const orderController = new OrderController();

router.get("/", verifyToken, checkPermission("ADMIN"), orderController.findAll);
router.get("/user", verifyToken, orderController.findByUser);
router.post("/create", verifyToken, orderController.create);

export default router;