import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  generateTC,
  getTCs,
  getTCById,
  downloadTC,
  createManualTC,
  uploadTCFile,
  searchTCByAdmNo
} from '../controllers/tcController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

// Public route for student search
router.get('/search/:admNo', searchTCByAdmNo);

router.post('/generate', protect, authorize('admin'), generateTC);
router.post('/manual', protect, authorize('admin'), createManualTC);
router.post('/upload', protect, authorize('admin'), upload.single('tcFile'), uploadTCFile);
router.get('/', protect, getTCs);
router.get('/:id', protect, getTCById);
router.get('/:id/download', protect, downloadTC);

export default router;


