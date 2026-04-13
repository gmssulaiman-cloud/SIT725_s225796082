// routes/books.routes.js
const express = require('express');
const router = express.Router();

// Direct import - no index.js layer
const booksController = require('../controllers/booksController');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);

module.exports = router;