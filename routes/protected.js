const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Protected route
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!', user: req.user });
});

module.exports = router;


