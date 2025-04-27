const express = require('express');
const router = express.Router();
const { BASE_URL } = require('../config/config');

router.get('/base-url', (req, res) => {
  res.json({ BASE_URL });
});

module.exports = router;
