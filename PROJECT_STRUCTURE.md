# TISK School ERP - Project Structure

```
tisk-school-erp/
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Teachers.jsx
│   │   │   ├── Academics.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Admissions.jsx
│   │   │   ├── Fees.jsx
│   │   │   ├── TC.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── dashboard/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── TeacherDashboard.jsx
│   │   │       ├── ParentDashboard.jsx
│   │   │       └── StudentDashboard.jsx
│   │   ├── context/                 # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── utils/                   # Utilities
│   │   │   └── axios.js
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                           # Node.js Backend
│   ├── models/                       # MongoDB Models
│   │   ├── User.js
│   │   ├── Admission.js
│   │   ├── TC.js
│   │   ├── Fee.js
│   │   ├── Notice.js
│   │   └── Gallery.js
│   ├── routes/                       # API Routes
│   │   ├── auth.js
│   │   ├── admissions.js
│   │   ├── tc.js
│   │   ├── fees.js
│   │   ├── teachers.js
│   │   ├── students.js
│   │   ├── notices.js
│   │   └── gallery.js
│   ├── controllers/                  # Route Controllers
│   │   ├── authController.js
│   │   ├── admissionController.js
│   │   ├── tcController.js
│   │   ├── feeController.js
│   │   ├── teacherController.js
│   │   ├── studentController.js
│   │   ├── noticeController.js
│   │   └── galleryController.js
│   ├── middleware/                   # Middleware
│   │   └── auth.js
│   ├── utils/                        # Utilities
│   │   ├── generateToken.js
│   │   └── upload.js
│   ├── uploads/                      # Uploaded files (gitignored)
│   │   ├── profiles/
│   │   ├── documents/
│   │   ├── tc/
│   │   └── receipts/
│   ├── index.js                      # Server entry point
│   ├── package.json
│   └── .env                          # Environment variables (gitignored)
│
├── package.json                      # Root package.json
├── README.md                         # Main documentation
├── SETUP.md                          # Setup instructions
├── DEPLOYMENT.md                     # Deployment guide
├── PROJECT_STRUCTURE.md             # This file
└── .gitignore                        # Git ignore rules
```

## Key Technologies

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Razorpay** - Payment gateway
- **PDFKit** - PDF generation
- **QRCode** - QR code generation
- **Nodemailer** - Email sending

## Features by Module

### Authentication
- JWT-based authentication
- Role-based access control (Admin, Teacher, Parent, Student)
- Protected routes
- Session management

### Admissions
- Online application form
- Document upload
- Status tracking
- Admin approval workflow
- Auto email notifications

### Fees
- Fee structure management
- Razorpay integration
- Payment history
- Receipt generation (PDF)
- Installment support

### TC (Transfer Certificate)
- Admin-generated TCs
- PDF generation
- QR code verification
- Download functionality

### Teachers
- Teacher profiles
- Subject filtering
- CRUD operations (admin)
- Profile images

### Students
- Student management
- Class-wise organization
- Parent-child linking

### Notices
- Notice creation
- Publishing workflow
- Category filtering
- Attachment support

### Gallery
- Image/video upload
- Category organization
- Lightbox viewing

## Database Schema

### User
- Authentication fields
- Role-based fields
- Profile information

### Admission
- Application details
- Document references
- Status tracking

### TC
- Student information
- TC details
- QR code data
- PDF path

### Fee Structure
- Class-wise fees
- Fee breakdown
- Academic year

### Payment
- Payment details
- Razorpay integration
- Receipt generation

### Notice
- Content fields
- Publishing status
- Target audience

### Gallery
- File information
- Category
- Metadata
