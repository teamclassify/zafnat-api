import express from "express";
import CartProductController from "../controllers/CartProductController.js";
import verifyToken from '../middlewares/verifyToken.js';


const cartProductRouter = express.Router();
const controller = new CartProductController();

cartProductRouter.get('/', verifyToken, controller.findAll);
cartProductRouter.get('/:id', verifyToken, controller.findOne);
cartProductRouter.post('/create', verifyToken, controller.create);
cartProductRouter.put('/update/:id', verifyToken, controller.update);
cartProductRouter.delete("/:id", verifyToken, controller.delete);

export default cartProductRouter;