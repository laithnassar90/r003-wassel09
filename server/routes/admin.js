import express from 'express';
import { requireAuth } from '../middleware/require-auth.js';
import { enforcePolicy } from '../middleware/cedarPolicyCheck.js';

const router = express.Router();

// Approve a trip
router.post('/trips/:id/approve', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  // Approve logic here
  res.json({ message: 'Trip approved' });
});

// View pending trips
router.get('/trips/pending', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  // Fetch pending trips
  res.json([{ id: 3, name: 'Wadi Mujib', status: 'pending' }]);
});

export default router;
