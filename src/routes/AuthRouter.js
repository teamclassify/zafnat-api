import express from "express";
import AuthController from "../controllers/AuthController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { loginValidator } from "../validators/LoginValidator.js";

const authRouter = express.Router();
const controller = new AuthController();

// router.get("/me", verifyToken, );
authRouter.post("/login", verifyToken, loginValidator, controller.login);

export default authRouter;
