# Quick Start Guide - TISK School ERP

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (2 min)

```bash
# Install all dependencies
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Step 2: Setup Environment (1 min)

Create `server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tisk_school
JWT_SECRET=change_this_to_a_random_secret_key_min_32_chars
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start MongoDB (1 min)

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### Step 4: Seed Initial Data (30 sec)

```bash
cd server
node --experimental-modules scripts/seed.js
```

This will create:
- Fee structures for all classes
- Ready-to-use data

### Step 5: Run the Application (30 sec)

```bash
# From root directory
npm run dev
```

**Or run separately:**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

### Step 6: Create Admin User

**Option A: Via MongoDB**
```javascript
// Connect to MongoDB and run:
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

**Option B: Via Registration + Update**
1. Register at http://localhost:5173/register
2. Update role in MongoDB to "admin"

### Step 7: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## 🎯 Test the System

1. **Login** with admin credentials
2. **Add Teachers** via Admin Dashboard
3. **View Fee Structures** - Already seeded
4. **Test Admissions** - Submit an application
5. **Generate TC** - Create a test TC
6. **Test Payment** - Use Razorpay test mode

## 🔧 Common Issues

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh
# Or restart MongoDB service
```

### Port Already in Use
```bash
# Change PORT in server/.env
# Or kill process on port 5000/5173
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📝 Next Steps

1. ✅ Configure Razorpay (for payments)
2. ✅ Setup Email (for notifications)
3. ✅ Add real school data
4. ✅ Customize branding
5. ✅ Deploy to production

## 🆘 Need Help?

- Check `SETUP.md` for detailed instructions
- Check `README.md` for full documentation
- Email: tiskprincipal@yahoo.com

---

**You're all set! 🎉**
