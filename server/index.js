import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import authRoutes from './routes/auth.js';
import admissionRoutes from './routes/admissions.js';
import tcRoutes from './routes/tc.js';
import feeRoutes from './routes/fees.js';
import teacherRoutes from './routes/teachers.js';
import studentRoutes from './routes/students.js';
import noticeRoutes from './routes/notices.js';
import galleryRoutes from './routes/gallery.js';
import certificateRoutes from './routes/certificates.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tisk_school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/tc', tcRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/certificates', certificateRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TISK School ERP API is running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

