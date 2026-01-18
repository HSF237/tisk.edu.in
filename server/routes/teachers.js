import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.get('/', getTeachers);
router.get('/:id', getTeacherById);
router.post('/', protect, authorize('admin'), upload.single('profileImage'), createTeacher);
router.put('/:id', protect, authorize('admin'), upload.single('profileImage'), updateTeacher);
router.delete('/:id', protect, authorize('admin'), deleteTeacher);

export default router;

