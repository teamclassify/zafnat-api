import express from "express";
import AddressController from "../controllers/AddressController.js";
import verifyToken from "../middlewares/verifyToken.js";

const addressRouter = express.Router();
const controller = new AddressController();

addressRouter.get("/", verifyToken, controller.findByUser);
addressRouter.post("/create", verifyToken, controller.create);
addressRouter.put("/:id", verifyToken, controller.update);
addressRouter.delete("/:id", verifyToken, controller.delete);


export default addressRouter;