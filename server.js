require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://lenslayereddesigns.netlify.app'], 
  credentials: true
}));

app.use(express.json());

// Static file serving for uploads (if you're using that)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/misc', require('./routes/misc'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // 💡 Max time to wait for Mongo before throwing an error
  socketTimeoutMS: 45000,          // 💡 Timeout for any stalled connection attempt
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));



// Root route for testing
app.get('/', (req, res) => {
  res.send('🚀 API is live!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

