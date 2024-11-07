import express from "express";
import UserController from "../controllers/UserController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();
const controller = new UserController();

userRouter.get("/", verifyToken, controller.findAll);
userRouter.get("/roles", verifyToken, controller.getRoles);
userRouter.get("/:id", verifyToken, controller.findOne);
userRouter.post("/set-role", verifyToken, controller.setRole);
userRouter.put("/update-profile", verifyToken, controller.update);
userRouter.delete("/unset-role", verifyToken, controller.unsetRole);

export default userRouter;
