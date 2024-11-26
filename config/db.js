const mongoose = require("mongoose");

// Get the MongoDB URI from environment variables
const url = process.env.MONGODB_URI || "mongodb+srv://book-management:Book@1234@cluster0.mxyz2.mongodb.net/book";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(url);
    console.log(`Database connected successfully: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the application if there's an error
  }
};

module.exports = connectDB;
