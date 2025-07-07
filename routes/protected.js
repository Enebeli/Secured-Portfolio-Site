const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifytoken');
const checkRole = require('../middleware/checkrole');

// Accessible by any logged-in user
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Welcome to your profile, user ${req.user.id}` });
});

// Admin only
router.get('/admin', verifyToken, checkRole('Admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin' });
});

// Shared route with role-specific behavior
router.get('/dashboard', verifyToken, (req, res) => {
  const role = req.user.role;
  if (role === 'Admin') {
    res.json({ message: 'Admin Dashboard: Access to all data' });
  } else {
    res.json({ message: 'User Dashboard: Access to limited data' });
  }
});

module.exports = router;
