import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
  publishNotice
} from '../controllers/noticeController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.get('/', getNotices);
router.get('/:id', getNoticeById);
router.post('/', protect, authorize('admin', 'teacher'), upload.array('attachments', 5), createNotice);
router.put('/:id', protect, authorize('admin', 'teacher'), upload.array('attachments', 5), updateNotice);
router.put('/:id/publish', protect, authorize('admin'), publishNotice);
router.delete('/:id', protect, authorize('admin'), deleteNotice);

export default router;

