import express from "express";
import ReviewController from "../controllers/ReviewController";
import verifyToken from '../middlewares/verifyToken.js';


const reviewRouter = express.Router();
const controller = new ReviewController();

reviewRouter.get('/', verifyToken, controller.findAll);
reviewRouter.get('/:id', verifyToken, controller.findOne);
reviewRouter.post('/create', verifyToken, controller.create);
reviewRouter.put('/update/:id', verifyToken, controller.update);
reviewRouter.delete("/:id", verifyToken, controller.delete);

export default reviewRouter;