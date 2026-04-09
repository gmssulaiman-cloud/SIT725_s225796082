const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// Mount the routes exactly as required
router.get('/', booksController.getAllBooks);      // GET /api/books
router.get('/:id', booksController.getBookById);   // GET /api/books/:id

module.exports = router;