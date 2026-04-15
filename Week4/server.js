const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB (local, your own DB name)
mongoose.connect('mongodb://127.0.0.1:27017/booksdb');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB booksdb!');
});

// Books Schema (your custom fields)
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  rating: Number,
  coverImage: String,
  isbn: String,
  summary: String
});
const Book = mongoose.model('Book', BookSchema);

// API Route: Fetch all books (your variation)
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ statusCode: 200, data: books, message: 'Books fetched successfully' });
  } catch (error) {
    res.json({ statusCode: 500, data: [], message: 'Error fetching books' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});