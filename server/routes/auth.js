import express from 'express';
import User from '../models/User.js';
import LoginActivity from '../models/LoginActivity.js';
import jwt from 'jsonwebtoken';
import { authenticateToken, checkAdmin } from '../middleware/auth.js';

const router = express.Router();

const recordAuthActivity = async (req, user, kind) => {
  const now = new Date();
  await User.findByIdAndUpdate(user._id, { lastLoginAt: now });
  await LoginActivity.create({
    userId: user._id,
    email: user.email,
    kind,
    ip: req.ip || null,
    userAgent: req.get('user-agent') || null,
  });
};

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      full_name: full_name || '',
    });

    await user.save();

    await recordAuthActivity(req, user, 'signup');

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    await recordAuthActivity(req, user, 'signin');

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Signed in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        phone: user.phone,
        address: user.address,
        city: user.city,
        pincode: user.pincode,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get Current User Profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        phone: user.phone,
        address: user.address,
        city: user.city,
        pincode: user.pincode,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { full_name, phone, address, city, pincode } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { full_name, phone, address, city, pincode },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        phone: user.phone,
        address: user.address,
        city: user.city,
        pincode: user.pincode,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check Admin Role
router.post('/check-admin', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isAdmin = user && user.role === 'admin';
    res.json({ isAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Only: Get all users (for admin dashboard)
router.get('/users', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Login
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    // Check if admin
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Invalid admin credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    await recordAuthActivity(req, user, 'admin_signin');

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Admin signed in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
