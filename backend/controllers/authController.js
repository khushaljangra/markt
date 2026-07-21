import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isDbConnected, mockDb } from '../config/mockDb.js';

// Generate JWT Token
const generateToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_for_jwt_tokens';
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '30d',
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  const { name, email, password, referralCode } = req.body;

  try {
    if (!isDbConnected()) {
      const userExists = mockDb.users.some((u) => u.email === email);
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      let referredByUser = null;
      if (referralCode) {
        referredByUser = mockDb.users.find((u) => u.referralCode === referralCode.toUpperCase());
        if (referredByUser) {
          referredByUser.referralEarnings += 100;
        }
      }

      const user = {
        _id: `user_mock_${Date.now()}`,
        name,
        email,
        role: email.includes('admin') ? 'admin' : 'user',
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        referralEarnings: 0,
        wishlist: [],
        createdAt: new Date(),
      };

      mockDb.users.push(user);

      return res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        token: generateToken(user._id),
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    let referredByUser = null;
    if (referralCode) {
      referredByUser = await User.findOne({ referralCode: referralCode.toUpperCase() });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      referredBy: referredByUser ? referredByUser._id : null,
    });

    if (user) {
      if (referredByUser) {
        referredByUser.referralEarnings += 100; 
        await referredByUser.save();
      }

      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!isDbConnected()) {
      // In mock sandbox, let any login succeed if the email exists, or create a mock session.
      // If email doesn't exist, we can register them dynamically for a friction-free experience!
      let user = mockDb.users.find((u) => u.email === email);
      if (!user) {
        user = {
          _id: `user_mock_${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: email.includes('admin') ? 'admin' : 'user',
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
          referralEarnings: 0,
          wishlist: [],
          createdAt: new Date(),
        };
        mockDb.users.push(user);
      }

      return res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        token: generateToken(user._id),
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const user = mockDb.users.find((u) => u._id === req.user._id);
      if (user) {
        const wishlistDetails = user.wishlist.map(id => mockDb.projects.find(p => p._id === id)).filter(p => p);
        return res.json({
          success: true,
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          referralCode: user.referralCode,
          referralEarnings: user.referralEarnings,
          wishlist: wishlistDetails,
          avatar: user.avatar || '',
          createdAt: user.createdAt || new Date(),
        });
      }
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = await User.findById(req.user._id).populate('wishlist');

    if (user) {
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        referralEarnings: user.referralEarnings,
        wishlist: user.wishlist,
        avatar: user.avatar || '',
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const user = mockDb.users.find((u) => u._id === req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.avatar = req.body.avatar !== undefined ? req.body.avatar : user.avatar;
        return res.json({
          success: true,
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          referralCode: user.referralCode,
          avatar: user.avatar || '',
          token: generateToken(user._id),
        });
      }
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.avatar = req.body.avatar !== undefined ? req.body.avatar : user.avatar;
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        referralCode: updatedUser.referralCode,
        avatar: updatedUser.avatar || '',
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get Wishlist
 * @route   GET /api/auth/wishlist
 * @access  Private
 */
export const getWishlist = async (req, res) => {
  try {
    if (!isDbConnected()) {
      const user = mockDb.users.find((u) => u._id === req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const wishlistDetails = user.wishlist.map(id => mockDb.projects.find(p => p._id === id)).filter(p => p);
      return res.json({ success: true, wishlist: wishlistDetails });
    }

    const user = await User.findById(req.user._id).populate('wishlist');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Toggle item in wishlist
 * @route   POST /api/auth/wishlist
 * @access  Private
 */
export const toggleWishlist = async (req, res) => {
  const { projectId } = req.body;

  try {
    if (!isDbConnected()) {
      const user = mockDb.users.find((u) => u._id === req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const index = user.wishlist.indexOf(projectId);
      let isAdded = false;

      if (index > -1) {
        user.wishlist.splice(index, 1);
      } else {
        user.wishlist.push(projectId);
        isAdded = true;
      }

      return res.json({ success: true, wishlist: user.wishlist, isAdded });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const index = user.wishlist.indexOf(projectId);
    let isAdded = false;

    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(projectId);
      isAdded = true;
    }

    await user.save();
    res.json({ success: true, wishlist: user.wishlist, isAdded });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
