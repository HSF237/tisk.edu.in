import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.get('/', getGalleryItems);
router.get('/:id', getGalleryItemById);
router.post('/', protect, authorize('admin'), upload.single('image'), createGalleryItem);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);

export default router;

