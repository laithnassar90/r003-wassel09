export function enforcePolicy(actionType) {
  return (req, res, next) => {
    // Simulated Cedar policy check
    const user = req.user;
    const resource = req.body;

    // Example logic: only admins can approve trips
    if (actionType === 'approveTrip' && user.role !== 'admin') {
      return res.status(403).json({ error: 'Policy violation: only admins can approve trips' });
    }

    // Example logic: users can book only approved trips
    if (actionType === 'bookTrip' && resource.status !== 'approved') {
      return res.status(403).json({ error: 'Policy violation: trip not approved' });
    }

    // If all checks pass
    next();
  };
}
