import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import verifyToken from '../middlewares/verifyToken.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';

const CategoryRouter = express.Router();
const controller = new CategoryController();

CategoryController.get('/', verifyToken, controller.findAll);
CategoryController.get('/:id', verifyToken, controller.findOne);
CategoryController.post('/create', verifyToken, onlyAdmin, controller.create);
CategoryController.put('/update/:id', verifyToken, onlyAdmin, controller.update);
CategoryController.delete('/delete/:id', verifyToken, onlyAdmin, controller.delete);

export default CategoryRouter;