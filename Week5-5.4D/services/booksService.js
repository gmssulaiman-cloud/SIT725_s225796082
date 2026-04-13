const Book = require('../models/booksModel');

const allowedFields = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];

const rejectUnknownFields = (data) => {
  const extraFields = Object.keys(data).filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    throw new Error(`Unknown field(s): ${extraFields.join(', ')}`);
  }
};

const normalizePrice = (data) => {
  if (data.price !== undefined && data.price !== null) {
    data.price = mongoose.Types.Decimal128.fromString(String(data.price));
  }
};

const getAllBooks = async () => {
  const books = await Book.find().lean({ getters: true });
  return books.map(book => ({ ...book, price: Number(book.price) }));
};

const getBookById = async (id) => {
  const book = await Book.findOne({ id }).lean({ getters: true });
  if (!book) return null;
  return { ...book, price: Number(book.price) };
};

const createBook = async (data) => {
  rejectUnknownFields(data);
  const book = new Book(data);
  const saved = await book.save();
  return saved.toJSON();
};

const updateBook = async (id, data) => {
  rejectUnknownFields(data);

  if (Object.prototype.hasOwnProperty.call(data, 'id')) {
    if (data.id !== id) {
      throw new Error('ID is immutable and cannot be changed');
    }
    delete data.id;
  }

  const book = await Book.findOneAndUpdate(
    { id },
    data,
    { new: true, runValidators: true, context: 'query' }
  );

  if (!book) return null;
  return book.toJSON();
};

module.exports = { getAllBooks, getBookById, createBook, updateBook };