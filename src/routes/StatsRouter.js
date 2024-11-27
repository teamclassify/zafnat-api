import express from "express";
import StatsController from "../controllers/StatsController.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkPermission from "../middlewares/rbac.js";

const router = express.Router();

const statsController = new StatsController();

router.get("/orders", statsController.ordersStats);
router.get("/products", statsController.productsStats);
router.get("/users", statsController.usersStats);

export default router;