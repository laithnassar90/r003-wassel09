export async function getCurrentUser(req, res) {
  res.json({ user: req.user });
}

export async function updateUserProfile(req, res) {
  const updates = req.body;
  // Update logic here
  res.json({ message: 'Profile updated', updates });
}

export async function listAllUsers(req, res) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  // Fetch users from DB
  res.json([{ id: 1, name: 'Laith' }, { id: 2, name: 'Nour' }]);
}
