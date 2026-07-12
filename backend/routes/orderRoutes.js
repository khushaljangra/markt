import express from 'express';
import {
  checkout,
  verifyPayment,
  getMyPurchasedProjects,
  getDownloadHistory,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', protect, checkout);
router.post('/verify', protect, verifyPayment);
router.get('/my-purchases', protect, getMyPurchasedProjects);
router.get('/download-history', protect, getDownloadHistory);
router.get('/', protect, admin, getAllOrders);

export default router;
