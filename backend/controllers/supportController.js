import SupportMessage from '../models/SupportMessage.js';
import User from '../models/User.js';
import { isDbConnected, mockDb } from '../config/mockDb.js';

/**
 * @desc    Get support messages for a user
 * @route   GET /api/support
 * @access  Private
 */
export const getMessages = async (req, res) => {
  const userId = req.user.role === 'admin' && req.query.userId ? req.query.userId : req.user._id;

  try {
    if (!isDbConnected()) {
      const messages = mockDb.support.filter(m => m.user === userId);
      return res.json({ success: true, messages });
    }

    const messages = await SupportMessage.find({ user: userId })
      .populate('sender', 'name role')
      .sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Send a support message
 * @route   POST /api/support
 * @access  Private
 */
export const sendMessage = async (req, res) => {
  const { message, userId } = req.body;

  try {
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message content is required' });
    }

    const targetUser = req.user.role === 'admin' && userId ? userId : req.user._id;
    const isAdmin = req.user.role === 'admin';

    if (!isDbConnected()) {
      const newMessage = {
        _id: `msg_mock_${Date.now()}`,
        user: targetUser,
        sender: {
          _id: req.user._id,
          name: req.user.name,
          role: req.user.role
        },
        message,
        isAdminReply: isAdmin,
        createdAt: new Date()
      };

      mockDb.support.push(newMessage);
      return res.status(201).json({ success: true, message: newMessage });
    }

    const newMessage = await SupportMessage.create({
      user: targetUser,
      sender: req.user._id,
      message,
      isAdminReply: isAdmin,
    });

    const populatedMessage = await newMessage.populate('sender', 'name role');

    res.status(201).json({ success: true, message: populatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all active user support chats (Admin only)
 * @route   GET /api/support/admin/chats
 * @access  Private/Admin
 */
export const getAdminChats = async (req, res) => {
  try {
    if (!isDbConnected()) {
      // Find unique user IDs in mockDb.support messages list
      const uniqueUserIds = [...new Set(mockDb.support.map(m => m.user))];
      const chats = uniqueUserIds.map(uid => {
        const userMessages = mockDb.support.filter(m => m.user === uid);
        const latest = userMessages[userMessages.length - 1];
        const userInfo = mockDb.users.find(u => u._id === uid);
        return {
          userId: uid,
          user: userInfo ? { name: userInfo.name, email: userInfo.email } : null,
          lastMessage: latest ? latest.message : '',
          lastMessageAt: latest ? latest.createdAt : new Date()
        };
      });

      return res.json({ success: true, chats });
    }

    const chatUsers = await SupportMessage.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$user',
          lastMessage: { $first: '$message' },
          lastMessageAt: { $first: '$createdAt' },
        }
      },
      { $sort: { lastMessageAt: -1 } }
    ]);

    const chats = await Promise.all(
      chatUsers.map(async (chat) => {
        const userInfo = await User.findById(chat._id).select('name email');
        return {
          userId: chat._id,
          user: userInfo,
          lastMessage: chat.lastMessage,
          lastMessageAt: chat.lastMessageAt,
        };
      })
    );

    res.json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
