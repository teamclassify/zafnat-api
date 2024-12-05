import express from "express";
import StatsController from "../controllers/StatsController.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkPermission from "../middlewares/rbac.js";

const router = express.Router();

const statsController = new StatsController();

router.get("/sales", statsController.salesStats);
router.get("/products", verifyToken, checkPermission("ADMIN"), statsController.productsStats);
router.get("/users", verifyToken, checkPermission("ADMIN"), statsController.usersStats);

export default router;