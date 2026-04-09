const booksService = require('../services/books.service');

const getAllBooks = (req, res) => {
  const books = booksService.getAllBooks();
  res.json(books);                    // returns clean array for the client
};

const getBookById = (req, res) => {
  const book = booksService.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
};

module.exports = { getAllBooks, getBookById };