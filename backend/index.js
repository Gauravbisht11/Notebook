const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectToMongo = require('./db');
connectToMongo();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend domain (replace * with your frontend Render URL for security)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

app.use(express.json());

// Example: require('./routes/auth')
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
