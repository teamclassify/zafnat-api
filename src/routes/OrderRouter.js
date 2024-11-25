import express from "express";
import OrderController from "../controllers/OrderController.js";

const router = express.Router();

const orderController = new OrderController();

router.get("/", orderController.findAll);
router.get("/user", orderController.findByUser);
router.post("/create", orderController.create);

export default router;