const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
    trim: true,
    minlength: [2, 'ID must be at least 2 characters'],
    maxlength: [10, 'ID cannot exceed 10 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    minlength: [3, 'Author must be at least 3 characters'],
    maxlength: [100, 'Author cannot exceed 100 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    validate: {
      validator: Number.isInteger,
      message: 'Year must be an integer'
    },
    min: [1000, 'Year must be 1000 or later'],
    max: [2030, 'Year cannot be in the distant future']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required']
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    trim: true,
    minlength: [20, 'Summary must be at least 20 characters'],
    maxlength: [1000, 'Summary cannot exceed 1000 characters']
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'Price is required'],
    validate: {
      validator: function(value) {
        const num = parseFloat(value.toString());
        return num >= 0.01 && num <= 999.99;
      },
      message: 'Price must be between 0.01 and 999.99'
    }
  }
}, {
  toJSON: {
    getters: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Book', BookSchema);