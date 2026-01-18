import Admission from '../models/Admission.js';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import nodemailer from 'nodemailer';
import { admissionConfirmationTemplate, admissionApprovalTemplate } from '../utils/emailTemplates.js';

// @desc    Apply for admission
// @route   POST /api/admissions/apply
// @access  Public
export const applyForAdmission = async (req, res) => {
  try {
    const {
      studentName,
      dateOfBirth,
      gender,
      classApplied,
      parentName,
      parentEmail,
      parentPhone,
      address,
      previousSchool
    } = req.body;

    // Handle file uploads
    const documents = {};
    if (req.files) {
      if (req.files.birthCertificate) documents.birthCertificate = req.files.birthCertificate[0].path;
      if (req.files.previousMarksheet) documents.previousMarksheet = req.files.previousMarksheet[0].path;
      if (req.files.photo) documents.photo = req.files.photo[0].path;
      if (req.files.aadhar) documents.aadhar = req.files.aadhar[0].path;
      if (req.files.other) documents.other = req.files.other.map(file => file.path);
    }

    const admission = await Admission.create({
      studentName,
      dateOfBirth,
      gender,
      classApplied,
      parentName,
      parentEmail,
      parentPhone,
      address,
      previousSchool,
      documents
    });

    // Send confirmation email
    try {
      await sendAdmissionConfirmationEmail(admission);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully',
      data: admission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Private
export const getAdmissions = async (req, res) => {
  try {
    let query = {};

    // Students/Parents can only see their own applications
    if (req.user.role === 'student' || req.user.role === 'parent') {
      query.parentEmail = req.user.email;
    }

    const admissions = await Admission.find(query)
      .sort({ createdAt: -1 })
      .populate('approvedBy', 'name email')
      .populate('studentId', 'name email admissionNumber');

    res.json({
      success: true,
      count: admissions.length,
      data: admissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single admission
// @route   GET /api/admissions/:id
// @access  Private
export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate('approvedBy', 'name email')
      .populate('studentId', 'name email admissionNumber');

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    res.json({
      success: true,
      data: admission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update admission status
// @route   PUT /api/admissions/:id/approve
// @access  Private/Admin
export const updateAdmissionStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    admission.status = status || admission.status;
    admission.remarks = remarks || admission.remarks;
    admission.approvedBy = req.user.id;
    admission.approvedAt = new Date();

    // If approved, create student account
    if (status === 'approved' && !admission.studentId) {
      const student = await User.create({
        name: admission.studentName,
        email: `${admission.applicationNumber.toLowerCase()}@tisk.edu`,
        password: Math.random().toString(36).slice(-8), // Random password
        role: 'student',
        admissionNumber: admission.applicationNumber,
        class: admission.classApplied,
        phone: admission.parentPhone
      });

      admission.studentId = student._id;

      // Send credentials email
      try {
        await sendStudentCredentialsEmail(admission, student);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    await admission.save();

    res.json({
      success: true,
      message: `Admission ${status} successfully`,
      data: admission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete admission
// @route   DELETE /api/admissions/:id
// @access  Private/Admin
export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    await admission.deleteOne();

    res.json({
      success: true,
      message: 'Admission deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper: Send admission confirmation email
const sendAdmissionConfirmationEmail = async (admission) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"TISK School" <${process.env.EMAIL_USER}>`,
      to: admission.parentEmail,
      subject: 'Admission Application Received - TISK EMS',
      html: admissionConfirmationTemplate(admission)
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

// Helper: Send student credentials email
const sendStudentCredentialsEmail = async (admission, student) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"TISK School" <${process.env.EMAIL_USER}>`,
      to: admission.parentEmail,
      subject: 'Admission Approved - Student Login Credentials - TISK EMS',
      html: admissionApprovalTemplate(admission, student)
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

