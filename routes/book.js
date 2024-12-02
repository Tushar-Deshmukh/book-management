const express = require("express");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");

const {
  addBookCategory,
  addBookSubCategory,
  getAllSubCategoriesByCategoryId,
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getAllCategories,
} = require("../controllers/book");

router.post("/add-book-category", addBookCategory);
router.post("/add-book-subcategory", addBookSubCategory);
router.get("/categories", getAllCategories);
router.get("/getAllSubcategories", getAllSubCategoriesByCategoryId);
router.post("/add-book", checkLogin, addBook);
router.get("/get-all-books", checkLogin, getAllBooks);
router.put("/update-book/:id", checkLogin, updateBook);
router.delete("/delete-book/:id", checkLogin, deleteBook);

module.exports = router;
