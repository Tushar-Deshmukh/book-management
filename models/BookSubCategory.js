const mongoose = require("mongoose");

const bookSubCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookCategory",
  },
});

const BookSubCategory = mongoose.model(
  "BookSubCategory",
  bookSubCategorySchema
);

module.exports = BookSubCategory;