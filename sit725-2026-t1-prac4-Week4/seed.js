const mongoose = require('mongoose');

// Connect
mongoose.connect('mongodb://127.0.0.1:27017/booksdb');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  rating: Number,
  coverImage: String,
  isbn: String,
  summary: String
});
const Book = mongoose.model('Book', BookSchema);

// YOUR exact images + matching books
const sampleBooks = [
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    rating: 4.3,
    coverImage: 'images/book1.jpg',     // ← YOUR 1984 cover
    isbn: '978-0451524935',
    summary: 'Big Brother is watching. A chilling dystopian classic about totalitarianism.'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance/Classics',
    rating: 4.5,
    coverImage: 'images/book2.jpg',     // ← YOUR Pride & Prejudice cover
    isbn: '978-0141439518',
    summary: 'Elizabeth Bennet navigates love, class, and family in Regency England.'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction/Coming-of-Age',
    rating: 4.7,
    coverImage: 'images/book3.jpg',     // ← YOUR Mockingbird cover
    isbn: '978-0061120084',
    summary: 'Scout Finch learns about racism and morality through her father Atticus.'
  }
];

// Clear and re-seed
Book.deleteMany({}).then(() => {
  return Book.insertMany(sampleBooks);
}).then(() => {
  console.log('✅ Seeded YOUR books: 1984, Pride & Prejudice, To Kill a Mockingbird');
  mongoose.connection.close();
}).catch(err => {
  console.error('❌ Error:', err);
  mongoose.connection.close();
});