import TC from '../models/TC.js';
import User from '../models/User.js';
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Generate TC
// @route   POST /api/tc/generate
// @access  Private/Admin
export const generateTC = async (req, res) => {
  try {
    const {
      studentName,
      admissionNumber,
      class: studentClass,
      dateOfBirth,
      parentName,
      dateOfLeaving,
      reason,
      character,
      conduct,
      studentId
    } = req.body;

    // Create TC record
    const tc = await TC.create({
      studentName,
      admissionNumber,
      class: studentClass,
      dateOfBirth,
      parentName,
      dateOfLeaving,
      reason,
      character: character || 'good',
      conduct: conduct || 'good',
      generatedBy: req.user.id,
      studentId: studentId || null
    });

    // Generate QR Code
    const qrData = JSON.stringify({
      tcNumber: tc.tcNumber,
      studentName: tc.studentName,
      admissionNumber: tc.admissionNumber,
      dateOfLeaving: tc.dateOfLeaving
    });

    const qrCodeDataURL = await QRCode.toDataURL(qrData);
    tc.qrCode = qrCodeDataURL;

    // Generate PDF
    const pdfPath = await generateTCPDF(tc);
    tc.pdfPath = pdfPath;

    await tc.save();

    res.status(201).json({
      success: true,
      message: 'TC generated successfully',
      data: tc
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all TCs
// @route   GET /api/tc
// @access  Private
export const getTCs = async (req, res) => {
  try {
    let query = {};

    // Students can only see their own TCs
    if (req.user.role === 'student') {
      query.studentId = req.user.id;
    }

    const tcs = await TC.find(query)
      .sort({ createdAt: -1 })
      .populate('generatedBy', 'name email')
      .populate('studentId', 'name email admissionNumber');

    res.json({
      success: true,
      count: tcs.length,
      data: tcs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single TC
// @route   GET /api/tc/:id
// @access  Private
export const getTCById = async (req, res) => {
  try {
    const tc = await TC.findById(req.params.id)
      .populate('generatedBy', 'name email')
      .populate('studentId', 'name email admissionNumber');

    if (!tc) {
      return res.status(404).json({
        success: false,
        message: 'TC not found'
      });
    }

    res.json({
      success: true,
      data: tc
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Download TC PDF
// @route   GET /api/tc/:id/download
// @access  Private
export const downloadTC = async (req, res) => {
  try {
    const tc = await TC.findById(req.params.id);

    if (!tc) {
      return res.status(404).json({
        success: false,
        message: 'TC not found'
      });
    }

    if (!tc.pdfPath || !fs.existsSync(tc.pdfPath)) {
      // Regenerate PDF if not exists
      const pdfPath = await generateTCPDF(tc);
      tc.pdfPath = pdfPath;
      await tc.save();
    }

    res.download(tc.pdfPath, `TC_${tc.tcNumber}.pdf`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper: Generate TC PDF
const generateTCPDF = async (tc) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const pdfDir = path.join(__dirname, '../uploads/tc');
    
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    const pdfPath = path.join(pdfDir, `TC_${tc.tcNumber}.pdf`);
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
    doc.fontSize(20).font('Helvetica-Bold').text('TRANSFER CERTIFICATE', { align: 'center', underline: true });
    doc.moveDown(1.5);

    // Body
    doc.fontSize(12).font('Helvetica');
    const formattedDOB = new Date(tc.dateOfBirth).toLocaleDateString('en-IN');
    const formattedLeaving = new Date(tc.dateOfLeaving).toLocaleDateString('en-IN');
    const formattedToday = new Date().toLocaleDateString('en-IN');

    doc.text(`Certified that ${tc.studentName}, son/daughter of ${tc.parentName}, was a bona-fide student of this institution.`);
    doc.moveDown(0.5);
    doc.text(`He/She was admitted on ${formattedDOB} as admission number ${tc.admissionNumber} and was studying in ${tc.class}.`);
    doc.moveDown(0.5);
    doc.text(`Date of Birth as per school records: ${formattedDOB}.`);
    doc.moveDown(0.5);
    doc.text(`His/Her character and conduct were found ${tc.character.toUpperCase()} during his/her stay in this institution.`);
    doc.moveDown(0.5);
    doc.text(`He/She left the school on ${formattedLeaving} on his/her own accord.`);
    doc.moveDown(0.5);
    doc.text(`Reason for Leaving: ${tc.reason}`);
    doc.moveDown(0.5);
    doc.text('I wish him/her all success in life.');
    doc.moveDown(2);

    // Footer with signatures
    doc.fontSize(10);
    const startX = 50;
    const endX = 550;
    const y = doc.y;

    // Date
    doc.text(`Date: ${formattedToday}`, startX, y);
    
    // Class Teacher
    doc.text('Class Teacher', (startX + endX) / 2 - 50, y);
    
    // Principal
    doc.text('Principal', endX - 50, y);

    // Signature lines
    doc.moveDown(2);
    doc.moveTo(startX, doc.y).lineTo(startX + 100, doc.y).stroke();
    doc.moveTo((startX + endX) / 2 - 50, doc.y - 20).lineTo((startX + endX) / 2 + 50, doc.y - 20).stroke();
    doc.moveTo(endX - 50, doc.y - 20).lineTo(endX + 50, doc.y - 20).stroke();

    // TC Number at bottom
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text(`TC Number: ${tc.tcNumber}`, { align: 'center' });

    // QR Code (if available)
    if (tc.qrCode) {
      const qrImage = tc.qrCode.split(',')[1];
      const qrBuffer = Buffer.from(qrImage, 'base64');
      doc.image(qrBuffer, endX - 80, 50, { width: 60, height: 60 });
    }

    doc.end();

    stream.on('finish', () => {
      resolve(pdfPath);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

