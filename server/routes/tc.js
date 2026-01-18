import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  generateTC,
  getTCs,
  getTCById,
  downloadTC
} from '../controllers/tcController.js';

const router = express.Router();

router.post('/generate', protect, authorize('admin'), generateTC);
router.get('/', protect, getTCs);
router.get('/:id', protect, getTCById);
router.get('/:id/download', protect, downloadTC);

export default router;

