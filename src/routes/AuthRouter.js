import express from "express";
import AuthController from "../controllers/AuthController.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = express.Router();
const controller = new AuthController();

// router.get("/me", verifyToken, );
authRouter.post("/login", verifyToken, controller.login);

export default authRouter;
