const mongoose = require('mongoose');
const Book = require('../models/booksModel');

const cleanTestData = async () => {
  await mongoose.connect('mongodb://localhost:27017/booksdb');
  
  // Delete only test books (ids starting with b99 or b1xx)
  const deleted = await Book.deleteMany({ 
    id: { $regex: /^b(99|1[0-9]{2})/ } 
  });
  
  console.log(`✅ Deleted ${deleted.deletedCount} test books. Only seed data remains.`);
  process.exit(0);
};

cleanTestData();