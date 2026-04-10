const express = require('express');
const router = express.Router();

// Import via index.js (exact pattern from prac)
const Controllers = require('../controllers/index.js');

router.get('/', Controllers.booksController.getAllBooks);
router.get('/:id', Controllers.booksController.getBookById);

module.exports = router;