import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  applyForAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
  deleteAdmission
} from '../controllers/admissionController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.post('/apply', upload.fields([
  { name: 'birthCertificate', maxCount: 1 },
  { name: 'previousMarksheet', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'aadhar', maxCount: 1 },
  { name: 'other', maxCount: 5 }
]), applyForAdmission);

router.get('/', protect, getAdmissions);
router.get('/:id', protect, getAdmissionById);
router.put('/:id/approve', protect, authorize('admin'), updateAdmissionStatus);
router.delete('/:id', protect, authorize('admin'), deleteAdmission);

export default router;

