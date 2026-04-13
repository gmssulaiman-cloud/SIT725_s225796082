const booksService = require('../services/booksService');

const getAllBooks = async (req, res) => {
  const books = await booksService.getAllBooks();
  res.status(200).json({ statusCode: 200, data: books, message: 'Books retrieved' });
};

const getBookById = async (req, res) => {
  const book = await booksService.getBookById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json({ statusCode: 200, data: book, message: 'Book retrieved' });
};

const createBook = async (req, res) => {
  try {
    const book = await booksService.createBook(req.body);
    res.status(201).json({ statusCode: 201, data: book, message: 'Book created successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate book id' });
    }
    return res.status(400).json({ message: err.message || 'Validation failed' });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await booksService.updateBook(req.params.id, req.body);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ statusCode: 200, data: book, message: 'Book updated successfully' });
  } catch (err) {
    if (err.message === 'ID is immutable and cannot be changed') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(400).json({ message: err.message || 'Validation failed' });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook };