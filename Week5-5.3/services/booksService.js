const Book = require('../models/books.model');

const getAllBooks = async () => {
  const books = await Book.find().lean({ getters: true });
  
  // Convert Decimal128 price to clean number
  return books.map(book => ({
    ...book,
    price: book.price ? Number(book.price) : 0
  }));
};

const getBookById = async (id) => {
  const book = await Book.findOne({ id }).lean({ getters: true });
  
  if (!book) return null;

  // Convert Decimal128 price to clean number
  return {
    ...book,
    price: book.price ? Number(book.price) : 0
  };
};

module.exports = { getAllBooks, getBookById };