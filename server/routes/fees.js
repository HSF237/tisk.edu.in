import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getFeeStructures,
  createFeeStructure,
  updateFeeStructure,
  createPayment,
  verifyPayment,
  getPaymentHistory,
  getPaymentById,
  generateReceipt
} from '../controllers/feeController.js';

const router = express.Router();

// Fee Structure Routes
router.get('/structure', protect, getFeeStructures);
router.post('/structure', protect, authorize('admin'), createFeeStructure);
router.put('/structure/:id', protect, authorize('admin'), updateFeeStructure);

// Payment Routes
router.post('/payment', protect, createPayment);
router.post('/verify', protect, verifyPayment);
router.get('/history', protect, getPaymentHistory);
router.get('/payment/:id', protect, getPaymentById);
router.get('/receipt/:id', protect, generateReceipt);

export default router;

