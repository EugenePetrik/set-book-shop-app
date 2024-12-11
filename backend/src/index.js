const colors = require('colors');
const { connectDB } = require('./config/database');
const { createApp } = require('./createApp');
const { swaggerDocs } = require('./utils/swagger');

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
connectDB();

const app = createApp();

const PORT = process.env.PORT || 5000;

/**
 * Starts the server and sets up Swagger documentation.
 */
app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold,
  );

  // Setup Swagger
  swaggerDocs(app, PORT);
});

/**
 * Handles unhandled promise rejections.
 * @param {Error} err - The error object.
 * @param {Promise} promise - The promise that was rejected.
 */
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  app.close(() => process.exit(1));
});
