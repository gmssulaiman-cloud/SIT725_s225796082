const express = require('express');
const app = express();
const PORT = 3000;

const booksRoute = require('./routes/books.routes');

// Serve the public folder (for index.html)
app.use(express.static('public'));

// Mount the books routes under /api/books
app.use('/api/books', booksRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Books API: http://localhost:${PORT}/api/books`);
});