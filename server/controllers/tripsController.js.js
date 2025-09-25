export async function getAllTrips(req, res) {
  // Fetch trips from DB
  res.json([
    { id: 1, name: 'Petra Adventure', status: 'approved' },
    { id: 2, name: 'Wadi Rum Camp', status: 'approved' }
  ]);
}

export async function bookTrip(req, res) {
  const tripId = req.params.id;
  const userId = req.user.id;
  // Booking logic here
  res.json({ message: `User ${userId} booked trip ${tripId}` });
}

export async function cancelTrip(req, res) {
  const tripId = req.params.id;
  const userId = req.user.id;
  // Cancellation logic here
  res.json({ message: `User ${userId} cancelled trip ${tripId}` });
}
