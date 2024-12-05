import ReportController from '../controllers/ReportController.js';
import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import checkPermission from '../middlewares/rbac.js';

const router = express.Router();
const reportController = new ReportController();

router.get('/sales', verifyToken, checkPermission("ADMIN"), reportController.salesReport);
router.get('/invoices', verifyToken, checkPermission("ADMIN"), reportController.invoicesReport);

export default router;