import express from 'express';
import { requireAuth } from '../middleware/require-auth.js';

const router = express.Router();

// Get current user profile
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// Update user profile
router.put('/me', requireAuth, (req, res) => {
  // Update logic here
  res.json({ message: 'Profile updated' });
});

// List all users (admin only)
router.get('/', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  // Fetch users from DB
  res.json([{ id: 1, name: 'Laith' }, { id: 2, name: 'Nour' }]);
});

export default router;
