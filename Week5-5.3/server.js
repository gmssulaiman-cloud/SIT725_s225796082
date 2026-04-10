const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const PORT = 3000;

// 1. Connect to MongoDB (hardcoded as required)
mongoose.connect('mongodb://localhost:27017/booksdb');

mongoose.connection.on('connected', () => {
  console.log('✔ Connected to MongoDB - booksdb');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// 2. App + middleware
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 3. Routes
const booksRoute = require('./routes/booksRoute');
app.use('/api/books', booksRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Books API ready!`);
});