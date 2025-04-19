const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// Log a new event
router.post('/track', async (req, res) => {
  try {
    const { event, meta } = req.body;
    await Analytics.create({ event, meta });
    res.json({ msg: 'Event tracked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Tracking failed' });
  }
});

// Show the dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const totalVisits = await Analytics.countDocuments({ event: 'visit' });
    const totalSignups = await Analytics.countDocuments({ event: 'signup' });
    const totalLogins = await Analytics.countDocuments({ event: 'login' });

    res.send(`
      <h1>📊 Lens & Layered Designs Analytics</h1>
      <ul>
        <li>Total Visits: ${totalVisits}</li>
        <li>Total Signups: ${totalSignups}</li>
        <li>Total Logins: ${totalLogins}</li>
      </ul>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load dashboard.');
  }
});

module.exports = router;


