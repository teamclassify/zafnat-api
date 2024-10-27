import express from 'express';
import FileController from '../controllers/FileController.js';
import verifyToken from '../middlewares/verifyToken.js';
import onlyAdmin from '../middlewares/onlyAdmin.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fileRouter = express.Router();
const controller = new FileController();

fileRouter.post('/upload', verifyToken, onlyAdmin, upload.single("file"), controller.upload);

export default fileRouter;