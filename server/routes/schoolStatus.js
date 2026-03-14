import express from 'express';
import SchoolStatus from '../models/SchoolStatus.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get current school status
// @route   GET /api/school-status
// @access  Public
router.get('/', async (req, res) => {
  try {
    const status = await SchoolStatus.findOne().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: status || { statusText: 'School is currently Open', statusType: 'open', isActive: false }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update school status
// @route   POST /api/school-status
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { statusText, statusType, isActive } = req.body;

    let status = await SchoolStatus.findOne().sort({ createdAt: -1 });

    if (status) {
      status.statusText = statusText;
      status.statusType = statusType;
      status.isActive = (isActive === true || isActive === 'true');
      status.updatedBy = req.user.id;
      status.lastUpdated = Date.now();
      await status.save();
    } else {
      status = await SchoolStatus.create({
        statusText,
        statusType,
        isActive: (isActive === true || isActive === 'true'),
        updatedBy: req.user.id
      });
    }

    res.json({
      success: true,
      message: 'School status updated successfully',
      data: status
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
