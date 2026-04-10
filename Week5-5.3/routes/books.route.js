// routes/books.routes.js
const express = require('express');
const router = express.Router();

// Import controllers using the index.js pattern (as shown in prac)
const Controllers = require('../controllers/index.js');

router.get('/', Controllers.booksController.getAllBooks);     // GET /api/books
router.get('/:id', Controllers.booksController.getBookById);  // GET /api/books/:id

module.exports = router;