const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  meta: Object
});

module.exports = mongoose.model('Analytics', analyticsSchema);


