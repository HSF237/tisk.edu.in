import mongoose from 'mongoose';

const countdownSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true
  },
  targetDate: {
    type: Date,
    required: [true, 'Target date is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Countdown = mongoose.model('Countdown', countdownSchema);
export default Countdown;
