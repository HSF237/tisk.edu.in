import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
    getCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate
} from '../controllers/certificateController.js';

const router = express.Router();

router.get('/', getCertificates);
router.post('/', protect, authorize('admin'), createCertificate);
router.put('/:id', protect, authorize('admin'), updateCertificate);
router.delete('/:id', protect, authorize('admin'), deleteCertificate);

export default router;
