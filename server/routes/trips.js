import express from 'express';
import { requireAuth } from '../middleware/require-auth.js';
import { enforcePolicy } from '../middleware/cedarPolicyCheck.js';

const router = express.Router();

// Get all trips
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Petra Adventure', status: 'approved' },
    { id: 2, name: 'Wadi Rum Camp', status: 'approved' }
  ]);
});

// Book a trip
router.post('/:id/book', requireAuth, enforcePolicy('bookTrip'), (req, res) => {
  // Booking logic here
  res.json({ message: 'Trip booked successfully' });
});

// Cancel a trip
router.post('/:id/cancel', requireAuth, enforcePolicy('cancelTrip'), (req, res) => {
  // Cancellation logic here
  res.json({ message: 'Trip cancelled' });
});

export default router;
