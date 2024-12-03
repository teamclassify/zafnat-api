import express from "express";
import InvoicesController from "../controllers/InvoicesController.js";
import verifyToken from '../middlewares/verifyToken.js';
import checkPermission from '../middlewares/rbac.js';

const router = express.Router();

const invoicesController = new InvoicesController();

router.get("/", verifyToken, checkPermission("ADMIN"), invoicesController.findAll);
router.get("/:id", verifyToken, checkPermission("ADMIN"), invoicesController.findById);

export default router;