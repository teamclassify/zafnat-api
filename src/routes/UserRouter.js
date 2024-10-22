import express from "express";
import UserController from "../controllers/UserController.js";
import verifyToken from "../middlewares/verifyToken.js";
import onlyAdmin from "../middlewares/onlyAdmin.js";

const userRouter = express.Router();
const controller = new UserController();

userRouter.get("/", verifyToken, onlyAdmin, controller.findAll);
userRouter.get("/:id", verifyToken, controller.findOne);

export default userRouter;