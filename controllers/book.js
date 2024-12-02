const BookCategory = require("../models/BookCategory");
const BookSubCategory = require("../models/BookSubCategory");
const Book = require("../models/Book");

/**
 * @swagger
 * /api/add-book-category:
 *   post:
 *     summary: Add a new book category
 *     tags:
 *       - Book Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 example: Fiction
 *     responses:
 *       201:
 *         description: Book category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Book category added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63f7a9c2f0b4c1d239a6e0d5
 *                     categoryName:
 *                       type: string
 *                       example: Fiction
 *       400:
 *         description: Validation error or missing fields
 *       500:
 *         description: Internal Server Error
 */
exports.addBookCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    // Validate input
    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // Create a new category
    const bookCategory = new BookCategory({ categoryName });
    await bookCategory.save();

    return res.status(201).json({
      success: true,
      message: "Book category added successfully",
      data: bookCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/add-book-subcategory:
 *   post:
 *     summary: Add a new book subcategory
 *     tags:
 *       - Book Subcategories
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         description: The ObjectId of the associated book category
 *         schema:
 *           type: string
 *           example: 63f7a9c2f0b4c1d239a6e0d5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subCategoryName:
 *                 type: string
 *                 example: Mystery
 *     responses:
 *       201:
 *         description: Book subcategory added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Book subcategory added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63f7b123f0b4c1d239a6e0f6
 *                     subCategoryName:
 *                       type: string
 *                       example: Mystery
 *                     categoryName:
 *                       type: string
 *                       example: 63f7a9c2f0b4c1d239a6e0d5
 *       400:
 *         description: Validation error or missing fields
 *       500:
 *         description: Internal Server Error
 */

exports.addBookSubCategory = async (req, res) => {
  try {
    const { subCategoryName } = req.body;
    const { categoryId } = req.query;

    // Validate input
    if (!subCategoryName || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name and categoryId are required",
      });
    }

    // Create a new subcategory
    const bookSubCategory = new BookSubCategory({
      subCategoryName,
      category: categoryId,
    });

    await bookSubCategory.save();

    return res.status(201).json({
      success: true,
      message: "Book subcategory added successfully",
      data: bookSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags:
 *       - Book Categories
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 645f1c2b8a1b3c2d5f7d8e9f
 *                   name:
 *                     type: string
 *                     example: Technology
 *                   description:
 *                     type: string
 *                     example: All tech-related content
 *       500:
 *         description: Internal server error
 */

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await BookCategory.find({});

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @swagger
 * /api/getAllSubcategories:
 *   get:
 *     summary: Get all subcategories by category ID
 *     tags:
 *       - Book Subcategories
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         description: The ObjectId of the book category to fetch subcategories for
 *         schema:
 *           type: string
 *           example: 63f7a9c2f0b4c1d239a6e0d5
 *     responses:
 *       200:
 *         description: A list of subcategories belonging to the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 63f7b123f0b4c1d239a6e0f6
 *                   subCategoryName:
 *                     type: string
 *                     example: Mystery
 *                   categoryName:
 *                     type: string
 *                     example: 63f7a9c2f0b4c1d239a6e0d5
 *       400:
 *         description: Invalid categoryId or categoryId not found
 *       500:
 *         description: Internal Server Error
 */

exports.getAllSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.query;

    // Validate categoryId
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    // Fetch all subcategories by categoryId
    const subCategories = await BookSubCategory.find({
      category: categoryId,
    });

    if (subCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found for this category",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/add-book:
 *   post:
 *     summary: Add a new book to the library
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []  # This route requires the bearer token for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookName:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               authorName:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               category:
 *                 type: string
 *                 example: "60b6d9f90a0f5b001c8f9ebf"  # Example ObjectId for category
 *               subCategory:
 *                 type: string
 *                 example: "60b6d9f90a0f5b001c8f9ec0"  # Example ObjectId for subcategory
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/book-image.jpg"
 *     responses:
 *       201:
 *         description: Book successfully added
 *       400:
 *         description: Bad Request - Validation errors or missing fields
 *       401:
 *         description: Unauthorized - Invalid token or no token provided
 *       500:
 *         description: Internal Server Error
 */

exports.addBook = async (req, res) => {
  try {
    const { bookName, authorName, category, subCategory, imageUrl } = req.body;
    const userId = req.user.id;

    // Validate the data
    if (!bookName || !authorName || !category || !subCategory || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Create a new book instance
    const newBook = new Book({
      bookName,
      authorName,
      category,
      subCategory,
      imageUrl,
      user: userId,
    });

    // Save the new book to the database
    await newBook.save();

    return res.status(201).json({
      success: true,
      message: "Book added successfully!",
      book: newBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @swagger
 * /api/get-all-books:
 *   get:
 *     summary: Get all books added by the authenticated user
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []  # This route requires the bearer token for authorization
 *     responses:
 *       200:
 *         description: Successfully retrieved books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60b6d9f90a0f5b001c8f9ebf"
 *                   bookName:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   authorName:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   category:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b6d9f90a0f5b001c8f9ebf"
 *                       categoryName:
 *                         type: string
 *                         example: "Fiction"
 *                   subCategory:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b6d9f90a0f5b001c8f9ec0"
 *                       subCategoryName:
 *                         type: string
 *                         example: "Classic"
 *                   imageUrl:
 *                     type: string
 *                     example: "https://example.com/book-image.jpg"
 *                   userId:
 *                     type: string
 *                     example: "60b6d9f90a0f5b001c8f9ebf"
 *       401:
 *         description: Unauthorized - Invalid token or no token provided
 *       500:
 *         description: Internal Server Error
 */

exports.getAllBooks = async (req, res) => {
  try {
    const userId = req.user._id;

    const books = await Book.find({ user: userId })
      .populate("category", "categoryName")
      .populate("subCategory", "subCategoryName");

    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @swagger
 * /api/update-book/{id}:
 *   put:
 *     summary: Update a book
 *     description: Updates the details of an existing book by its ID. The user must be authorized.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookName:
 *                 type: string
 *                 example: Updated Book Name
 *               authorName:
 *                 type: string
 *                 example: Updated Author Name
 *               category:
 *                 type: string
 *                 example: 64abf47d9a4e1f78efcb9e3d
 *               subCategory:
 *                 type: string
 *                 example: 64abf47d9a4e1f78efcb9e3e
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/updated-image.jpg
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Book updated successfully!
 *                 book:
 *                   type: object
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Perform update with spread operator
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully!",
      book: updatedBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @swagger
 * /api/delete-book/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes a book by its ID. Only the user who added the book can delete it.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Book deleted successfully!
 *       404:
 *         description: Book not found
 *       403:
 *         description: Unauthorized to delete this book
 *       500:
 *         description: Internal Server Error
 */

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book by ID
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
