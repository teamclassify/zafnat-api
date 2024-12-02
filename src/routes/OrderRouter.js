import express from "express";
import OrderController from "../controllers/OrderController.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkPermission from "../middlewares/rbac.js";

const router = express.Router();

const orderController = new OrderController();

router.get("/", orderController.findAll);
router.get("/:id", orderController.findById);
router.get("/user/:user_id", orderController.findByUser);
router.get("/user", verifyToken, orderController.findByUser);
router.post("/create", verifyToken, orderController.create);
router.post("/webhook", orderController.webhook);

export default router;