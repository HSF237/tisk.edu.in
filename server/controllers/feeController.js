import { FeeStructure, Payment } from '../models/Fee.js';
import User from '../models/User.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Get fee structures
// @route   GET /api/fees/structure
// @access  Private
export const getFeeStructures = async (req, res) => {
  try {
    const structures = await FeeStructure.find()
      .sort({ class: 1 });

    res.json({
      success: true,
      data: structures
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create fee structure
// @route   POST /api/fees/structure
// @access  Private/Admin
export const createFeeStructure = async (req, res) => {
  try {
    const {
      class: studentClass,
      tuitionFee,
      developmentFee,
      libraryFee,
      labFee,
      sportsFee,
      otherFee,
      academicYear
    } = req.body;

    const totalFee = tuitionFee + developmentFee + libraryFee + labFee + sportsFee + otherFee;

    const feeStructure = await FeeStructure.create({
      class: studentClass,
      tuitionFee,
      developmentFee,
      libraryFee,
      labFee,
      sportsFee,
      otherFee,
      totalFee,
      academicYear
    });

    res.status(201).json({
      success: true,
      message: 'Fee structure created successfully',
      data: feeStructure
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update fee structure
// @route   PUT /api/fees/structure/:id
// @access  Private/Admin
export const updateFeeStructure = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: 'Fee structure not found'
      });
    }

    // Recalculate total
    feeStructure.totalFee = feeStructure.tuitionFee + feeStructure.developmentFee +
      feeStructure.libraryFee + feeStructure.labFee + feeStructure.sportsFee + feeStructure.otherFee;
    await feeStructure.save();

    res.json({
      success: true,
      message: 'Fee structure updated successfully',
      data: feeStructure
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create payment order
// @route   POST /api/fees/payment
// @access  Private
export const createPayment = async (req, res) => {
  try {
    const { feeStructureId, studentId, paymentType, installmentNumber } = req.body;

    const feeStructure = await FeeStructure.findById(feeStructureId);
    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: 'Fee structure not found'
      });
    }

    const student = await User.findById(studentId || req.user.id);
    if (!student || student.role !== 'student') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const amount = feeStructure.totalFee * 100; // Convert to paise

    // Create Razorpay order
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `FEE_${Date.now()}`,
      notes: {
        studentId: student._id.toString(),
        studentName: student.name,
        class: student.class,
        feeStructureId: feeStructureId,
        paymentType: paymentType || 'full'
      }
    };

    const order = await razorpay.orders.create(options);

    // Create payment record
    const payment = await Payment.create({
      studentId: student._id,
      feeStructureId: feeStructure._id,
      amount: feeStructure.totalFee,
      paymentType: paymentType || 'full',
      installmentNumber: installmentNumber || 1,
      razorpayOrderId: order.id,
      status: 'pending',
      paidBy: req.user.id
    });

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      },
      paymentId: payment._id,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Verify payment
// @route   POST /api/fees/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      payment.status = 'failed';
      await payment.save();
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Update payment
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = 'completed';
    payment.paidAt = new Date();
    await payment.save();

    // Generate receipt
    const receiptPath = await generateReceiptPDF(payment);
    payment.receiptPath = receiptPath;
    await payment.save();

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get payment history
// @route   GET /api/fees/history
// @access  Private
export const getPaymentHistory = async (req, res) => {
  try {
    let query = {};

    // Students can only see their own payments
    if (req.user.role === 'student') {
      query.studentId = req.user.id;
    } else if (req.user.role === 'parent') {
      // Parents see their children's payments
      const parent = await User.findById(req.user.id).populate('children');
      const childrenIds = parent.children.map(child => child._id);
      query.studentId = { $in: childrenIds };
    }

    const payments = await Payment.find(query)
      .populate('studentId', 'name email admissionNumber class')
      .populate('feeStructureId')
      .populate('paidBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single payment
// @route   GET /api/fees/payment/:id
// @access  Private
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('studentId', 'name email admissionNumber class')
      .populate('feeStructureId')
      .populate('paidBy', 'name email');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Generate receipt
// @route   GET /api/fees/receipt/:id
// @access  Private
export const generateReceipt = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('studentId')
      .populate('feeStructureId');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (!payment.receiptPath || !fs.existsSync(payment.receiptPath)) {
      const receiptPath = await generateReceiptPDF(payment);
      payment.receiptPath = receiptPath;
      await payment.save();
    }

    res.download(payment.receiptPath, `Receipt_${payment._id}.pdf`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper: Generate Receipt PDF
const generateReceiptPDF = async (payment) => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const pdfDir = path.join(__dirname, '../uploads/receipts');
    
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    const pdfPath = path.join(pdfDir, `Receipt_${payment._id}.pdf`);
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text('TISK ENGLISH MEDIUM SCHOOL', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text('Kovvappuram, Cheruthazam Panchayath', { align: 'center' });
    doc.text('Near Ezhimala Railway Station, Kannur, Kerala – 670305', { align: 'center' });
    doc.text('CBSE Affiliation No: 931267', { align: 'center' });
    doc.moveDown(1);

    // Title
    doc.fontSize(20).font('Helvetica-Bold').text('FEE PAYMENT RECEIPT', { align: 'center', underline: true });
    doc.moveDown(1.5);

    // Receipt Details
    doc.fontSize(12).font('Helvetica');
    const formattedDate = new Date(payment.paidAt || payment.createdAt).toLocaleDateString('en-IN');

    doc.text(`Receipt Number: ${payment._id}`, { continued: false });
    doc.text(`Date: ${formattedDate}`, { align: 'right' });
    doc.moveDown(1);

    doc.text(`Student Name: ${payment.studentId.name}`);
    doc.text(`Admission Number: ${payment.studentId.admissionNumber || 'N/A'}`);
    doc.text(`Class: ${payment.studentId.class || 'N/A'}`);
    doc.moveDown(1);

    // Fee Breakdown
    doc.font('Helvetica-Bold').text('Fee Breakdown:', { underline: true });
    doc.moveDown(0.5);
    doc.font('Helvetica');
    doc.text(`Tuition Fee: ₹${payment.feeStructureId.tuitionFee}`);
    doc.text(`Development Fee: ₹${payment.feeStructureId.developmentFee}`);
    doc.text(`Library Fee: ₹${payment.feeStructureId.libraryFee}`);
    doc.text(`Lab Fee: ₹${payment.feeStructureId.labFee}`);
    doc.text(`Sports Fee: ₹${payment.feeStructureId.sportsFee}`);
    doc.text(`Other Fee: ₹${payment.feeStructureId.otherFee}`);
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').text(`Total Amount: ₹${payment.amount}`, { underline: true });
    doc.moveDown(1);

    // Payment Details
    doc.text(`Payment ID: ${payment.razorpayPaymentId || 'N/A'}`);
    doc.text(`Payment Status: ${payment.status.toUpperCase()}`);
    doc.moveDown(2);

    // Footer
    doc.fontSize(10).text('This is a computer-generated receipt.', { align: 'center' });
    doc.text('For any queries, please contact the school office.', { align: 'center' });

    doc.end();

    stream.on('finish', () => {
      resolve(pdfPath);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

