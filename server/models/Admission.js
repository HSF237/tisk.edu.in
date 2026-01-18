import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    unique: true,
    required: true
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  classApplied: {
    type: String,
    required: [true, 'Class is required'],
    trim: true
  },
  parentName: {
    type: String,
    required: [true, 'Parent name is required'],
    trim: true
  },
  parentEmail: {
    type: String,
    required: [true, 'Parent email is required'],
    lowercase: true,
    trim: true
  },
  parentPhone: {
    type: String,
    required: [true, 'Parent phone is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  previousSchool: {
    type: String,
    trim: true
  },
  documents: {
    birthCertificate: String,
    previousMarksheet: String,
    photo: String,
    aadhar: String,
    other: [String]
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'on_hold'],
    default: 'pending'
  },
  remarks: {
    type: String,
    trim: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  // If approved, create student account
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Generate application number before saving
admissionSchema.pre('save', async function(next) {
  if (!this.applicationNumber) {
    const count = await mongoose.model('Admission').countDocuments();
    this.applicationNumber = `APP${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const Admission = mongoose.model('Admission', admissionSchema);
export default Admission;

