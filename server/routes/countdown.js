import express from 'express';
import Countdown from '../models/Countdown.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get active countdown
// @route   GET /api/countdown
// @access  Public
router.get('/', async (req, res) => {
  try {
    const countdown = await Countdown.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: countdown });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Update or create countdown
// @route   POST /api/countdown
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { eventName, targetDate } = req.body;

    // Deactivate all previous countdowns
    await Countdown.updateMany({}, { isActive: false });

    const countdown = await Countdown.create({
      eventName,
      targetDate,
      isActive: true,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, data: countdown });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
