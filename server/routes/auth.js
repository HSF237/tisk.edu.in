import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setup-admin-initial', async (req, res) => {
    try {
        const { key } = req.body;
        if (key !== 'tisk_init_key_123') return res.status(401).json({ success: false });

        const User = (await import('../models/User.js')).default;
        const bcrypt = (await import('bcryptjs')).default;

        const email = 'tiskstaff@tiskems.edu.in';
        const existing = await User.findOne({ email });
        if (existing) return res.json({ success: true, message: 'Already exists' });

        const hashedPassword = await bcrypt.hash('tiskems@321', 10);
        await User.create({
            name: 'TISK Admin',
            email,
            password: hashedPassword,
            role: 'admin'
        });
        res.json({ success: true, message: 'Admin created' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;

