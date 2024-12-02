import express from "express";
import InvoicesController from "../controllers/InvoicesController.js";

const router = express.Router();

const invoicesController = new InvoicesController();

router.get("/", invoicesController.findAll);
router.get("/:id", invoicesController.findById);

export default router;