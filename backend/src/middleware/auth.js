const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Middleware to protect routes by checking for valid JWT token.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    req.user = await User.findById(decoded.id).populate({
      path: 'role',
      select: '_id name',
    });

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

/**
 * Middleware to grant access to specific roles.
 *
 * @param     {...string} roles - Roles that are allowed to access the route.
 * @returns   {Function} - Middleware function to check user role.
 */
exports.authorize = (...roles) => {
  /**
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   */
  return (req, res, next) => {
    if (!roles.includes(req.user.role.name)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role.name} is not authorized to access this route`,
          403,
        ),
      );
    }
    next();
  };
};
