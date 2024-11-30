import express from "express";
import RecomendacionesControllers from "../controllers/RecomendacionesControllers.js";

const recomendacionesRouter = express.Router();
const controller = new RecomendacionesControllers();

recomendacionesRouter.get("/:productId", controller.getRecomendaciones);

export default recomendacionesRouter;
