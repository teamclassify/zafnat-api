import express from 'express';
import SocialMediaController from '../controllers/SocialMediaController.js';
import verifyToken from '../middlewares/verifyToken.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';

const socialMediaRouter = express.Router();
const controller = new SocialMediaController();

socialMediaRouter.get('/', verifyToken, onlyAdmin, controller.findAll);
socialMediaRouter.get('/:id', verifyToken, onlyAdmin, controller.findOne);
socialMediaRouter.post('/create', verifyToken, onlyAdmin, controller.create);
socialMediaRouter.put('/update/:id', verifyToken, onlyAdmin, controller.update);

export default socialMediaRouter;