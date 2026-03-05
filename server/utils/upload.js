import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create uploads directory for local fallback
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

let storage;

// Check if Cloudinary credentials exist, if so use Cloudinary, otherwise fallback to local disk
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  console.log('✅ Cloudinary storage activated for uploads.');
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      // Auto resource type allows uploading PDFs, Word docs, etc. along with images
      return {
        folder: 'tisk_school',
        resource_type: 'auto',
        public_id: file.fieldname + '-' + Date.now()
      };
    },
  });
} else {
  console.log('⚠️ Cloudinary keys missing. Falling back to local disk storage. (Files will be lost on Render restart)');
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadPath = uploadDir;
      if (file.fieldname === 'photo' || file.fieldname === 'profileImage') {
        uploadPath = path.join(uploadDir, 'profiles');
      } else if (file.fieldname.includes('Certificate') || file.fieldname.includes('Marksheet')) {
        uploadPath = path.join(uploadDir, 'documents');
      } else {
        uploadPath = path.join(uploadDir, 'general');
      }

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
}

// File filter - explicitly allow images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedMimetypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf'
  ];

  if (allowedMimetypes.includes(file.mimetype)) {
    return cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg, .png, and .pdf files are allowed'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Increased to 10MB
  },
  fileFilter: fileFilter
});

