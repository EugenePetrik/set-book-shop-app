const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');

// Route files
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const bookingStatusRoutes = require('./routes/bookingStatus');
const productRoutes = require('./routes/product');
const roleRoutes = require('./routes/role');
const storeItemRoutes = require('./routes/storeItem');
const userRoutes = require('./routes/user');

/**
 * Creates an Express application with middleware and routes configured.
 * @returns {express.Application} The configured Express application.
 */
function createApp() {
  const app = express();

  // Body parser
  app.use(express.json());

  // Cookie parser
  app.use(cookieParser());

  // Dev logging middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan(':method :url :status HTTP/:http-version - :response-time ms'));
  }

  // Sanitize data
  app.use(mongoSanitize());

  // Set security headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 1_000_000,
  });
  app.use(limiter);

  // Prevent http param pollution
  app.use(hpp());

  // Enable CORS
  app.use(cors());

  // Mount routers
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/bookings', bookingRoutes);
  app.use('/api/v1/booking-statuses', bookingStatusRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/roles', roleRoutes);
  app.use('/api/v1/store-items', storeItemRoutes);
  app.use('/api/v1/users', userRoutes);

  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
