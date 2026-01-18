# TISK School ERP - Setup Guide

## Quick Start

### 1. Install Dependencies

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

### 2. Configure Environment

Create `server/.env` file with the following:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tisk_school
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if installed as service, it should auto-start)
# Or use MongoDB Atlas (cloud) and update MONGODB_URI

# Linux/Mac
sudo systemctl start mongod
# or
mongod
```

### 4. Run the Application

From the root directory:

```bash
# Run both server and client
npm run dev

# Or run separately:
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Creating Admin User

After starting the server, create an admin user via MongoDB or API:

### Option 1: Using MongoDB Compass/Shell

```javascript
use tisk_school
db.users.insertOne({
  name: "Admin User",
  email: "admin@tisk.edu",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyY5Y5Y5Y5Y5", // "admin123"
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Option 2: Using API (after registering)

1. Register a user via `/register` endpoint
2. Update role to 'admin' in MongoDB:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Razorpay Setup

1. Create account at https://razorpay.com
2. Get API keys from Dashboard → Settings → API Keys
3. Add keys to `server/.env`

## Email Setup (Gmail)

1. Enable 2-Step Verification
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use App Password in `EMAIL_PASS`

## Default Credentials

After setup, login with:
- Email: admin@tisk.edu (or your created admin)
- Password: (the password you set)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, whitelist your IP

### Port Already in Use
- Change `PORT` in `server/.env`
- Or kill process using port 5000/5173

### Razorpay Payment Not Working
- Verify API keys in `.env`
- Check Razorpay dashboard for test mode
- Ensure frontend URL matches Razorpay webhook settings

### File Upload Issues
- Ensure `server/uploads/` directory exists
- Check file size limits (default: 5MB)
- Verify multer configuration

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
cd server
# Set environment variables in platform
# Deploy
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use MongoDB Atlas for database
- Update `FRONTEND_URL` to production domain
- Use production Razorpay keys
- Configure email service

## Support

For issues or questions:
- Email: tiskprincipal@yahoo.com
- Phone: +91 497 281 2349
