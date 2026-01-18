import mongoose from 'mongoose';

const feeStructureSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tuitionFee: {
    type: Number,
    required: true,
    default: 0
  },
  developmentFee: {
    type: Number,
    default: 0
  },
  libraryFee: {
    type: Number,
    default: 0
  },
  labFee: {
    type: Number,
    default: 0
  },
  sportsFee: {
    type: Number,
    default: 0
  },
  otherFee: {
    type: Number,
    default: 0
  },
  totalFee: {
    type: Number,
    required: true
  },
  academicYear: {
    type: String,
    required: true,
    default: () => {
      const year = new Date().getFullYear();
      return `${year}-${year + 1}`;
    }
  }
}, {
  timestamps: true
});

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  feeStructureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeeStructure',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['full', 'installment'],
    default: 'full'
  },
  installmentNumber: {
    type: Number,
    default: 1
  },
  razorpayOrderId: {
    type: String,
    default: ''
  },
  razorpayPaymentId: {
    type: String,
    default: ''
  },
  razorpaySignature: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  receiptPath: {
    type: String,
    default: ''
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  paidAt: {
    type: Date
  }
}, {
  timestamps: true
});

const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
const Payment = mongoose.model('Payment', paymentSchema);

export { FeeStructure, Payment };

