import mongoose from 'mongoose';

const SchoolStatusSchema = new mongoose.Schema({
  statusText: {
    type: String,
    required: true,
    default: 'School is currently Open'
  },
  statusType: {
    type: String,
    enum: ['open', 'break', 'closed', 'special'],
    default: 'open'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.model('SchoolStatus', SchoolStatusSchema);
