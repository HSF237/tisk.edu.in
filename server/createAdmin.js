import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User schema directly to avoid import issues
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'parent', 'teacher', 'admin'], default: 'student' }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI is missing in .env');

        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);

        const email = 'tiskstaff@tiskems.edu.in';
        const password = 'tiskems@321';

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Admin user already exists!');
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: 'TISK Admin',
            email: email,
            password: hashedPassword,
            role: 'admin'
        });

        console.log('-----------------------------------');
        console.log('✅ Admin Account Created Successfully!');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('-----------------------------------');

    } catch (err) {
        console.error('❌ Error creating admin:', err.message);
    } finally {
        mongoose.connection.close();
    }
}

createAdmin();
