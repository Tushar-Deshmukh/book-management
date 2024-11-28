const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const bookRoutes = require("./routes/book");
const dotenv = require('dotenv');
const connectDB = require('./config/db');


const app = express();

//load the environment variables
dotenv.config();

//connect to DB
connectDB();

//middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api",uploadRoutes);
app.use("/api",bookRoutes);

app.listen(PORT,() => {
    console.log(`App started on PORT: ${PORT}`);
});