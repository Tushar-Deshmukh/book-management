const mongoose = require("mongoose");

const bookCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
});

const BookCategory = mongoose.model("BookCategory", bookCategorySchema);

module.exports = BookCategory;