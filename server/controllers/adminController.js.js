export async function approveTrip(req, res) {
  const tripId = req.params.id;
  // Approval logic here
  res.json({ message: `Trip ${tripId} approved` });
}

export async function getPendingTrips(req, res) {
  // Fetch pending trips from DB
  res.json([
    { id: 3, name: 'Wadi Mujib', status: 'pending' },
    { id: 4, name: 'Ajloun Forest', status: 'pending' }
  ]);
}
