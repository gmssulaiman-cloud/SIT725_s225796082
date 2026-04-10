const booksService = require('../services/booksService');

const getAllBooks = async (req, res, next) => {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: books,
      message: 'Books retrieved using service'
    });
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await booksService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({
      statusCode: 200,
      data: book,
      message: 'Book retrieved using service'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBooks, getBookById };