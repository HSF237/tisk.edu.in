# TISK English Medium School - ERP System

A complete, production-ready School Management Website and ERP System built with React, Node.js, and MongoDB.

## 🏫 School Information

- **Name**: TISK English Medium School
- **Established**: 1988
- **Affiliation**: CBSE (Affiliation No: 931267)
- **Type**: Co-educational, Private
- **Location**: Kovvappuram, Cheruthazam Panchayath, near Ezhimala Railway Station, Kannur, Kerala – 670305
- **Management**: Manshau Thazkiyathi Sunniyathil Islamiya

## 🚀 Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- Framer Motion (Animations)
- React Router DOM
- Axios (API calls)
- React Hot Toast (Notifications)

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (File uploads)
- Razorpay (Payment gateway)
- PDFKit (TC generation)
- QRCode (TC QR codes)
- Nodemailer (Email notifications)

## 📋 Features

### Public Pages
1. **Home Page** - Animated hero with video background, highlights, testimonials
2. **About Us** - School history, vision, mission, timeline
3. **Teachers** - Faculty profiles with filtering
4. **Academics** - Curriculum, labs, facilities
5. **Gallery** - Image & video gallery with lightbox
6. **Contact** - Contact form with Google Maps

### Authentication System
- Role-based access: Admin, Teacher, Parent, Student
- Secure JWT-based authentication
- Protected routes

### Admissions System
- Online admission application form
- Document upload (PDF/JPG)
- Application status tracking
- Admin approval dashboard
- Auto email confirmation

### TC (Transfer Certificate) System
- Admin generates TC with student details
- Auto-generated PDF with official format
- Unique TC ID & QR code
- Download & print functionality

### Fees Payment System
- Student/Parent login
- Fee structure by class
- Razorpay integration
- Auto receipt generation (PDF)
- Payment history
- Admin fee dashboard

### Admin Dashboard
- Manage students, teachers, admissions
- Upload notices & announcements
- Generate TC
- Track payments
- Manage homepage content & video
- Role-based access control

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Razorpay account (for payments)

### Step 1: Clone and Install

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Environment Configuration

1. Copy `server/.env.example` to `server/.env`
2. Update the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/tisk_school
JWT_SECRET=your_super_secret_jwt_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

### Step 3: Run the Application

```bash
# From root directory - runs both server and client
npm run dev

# Or run separately:
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### Step 4: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 👤 Default Admin Credentials

After first run, create an admin user via API or MongoDB:

```javascript
// Use Postman or MongoDB Compass to create admin
{
  "email": "admin@tisk.edu",
  "password": "admin123", // Will be hashed
  "role": "admin",
  "name": "Admin User"
}
```

## 📁 Project Structure

```
tisk-school-erp/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context API
│   │   ├── utils/          # Utilities
│   │   └── App.jsx         # Main app
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js Backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth & validation
│   ├── utils/              # Utilities
│   └── index.js            # Server entry
├── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Admissions
- `POST /api/admissions/apply` - Submit admission
- `GET /api/admissions` - Get admissions (role-based)
- `PUT /api/admissions/:id/approve` - Approve admission (admin)

### TC (Transfer Certificate)
- `POST /api/tc/generate` - Generate TC (admin)
- `GET /api/tc` - Get TC list
- `GET /api/tc/:id/download` - Download TC PDF

### Fees
- `GET /api/fees/structure` - Get fee structure
- `POST /api/fees/payment` - Create payment
- `GET /api/fees/history` - Payment history
- `POST /api/fees/verify` - Verify Razorpay payment

### Teachers
- `GET /api/teachers` - Get teachers
- `POST /api/teachers` - Add teacher (admin)
- `PUT /api/teachers/:id` - Update teacher (admin)
- `DELETE /api/teachers/:id` - Delete teacher (admin)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
cd server
# Set environment variables
# Deploy
```

### MongoDB
- Use MongoDB Atlas for production
- Update `MONGODB_URI` in production `.env`

## 📝 License

© 2024 TISK English Medium School. All Rights Reserved.

## 👨‍💻 Support

For support, email tiskprincipal@yahoo.com or contact +91 497 281 2349.

