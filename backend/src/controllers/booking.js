const bookingService = require('../services/booking');
const asyncHandler = require('../middleware/async');

/**
 * @desc      Get bookings
 * @route     GET /api/v1/bookings
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getBookings = asyncHandler(async (req, res, next) => {
  const bookings = await bookingService.getBookings();

  res.status(200).json({
    success: true,
    data: bookings,
  });
});

/**
 * @desc      Get specific booking
 * @route     GET /api/v1/bookings/:id
 * @access    Private/Manager/Customer
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getBookingById = asyncHandler(async (req, res, next) => {
  const booking = await bookingService.getBookingById(
    req.params.id,
    req.user.id,
    req.user.role.name,
  );

  res.status(200).json({
    success: true,
    data: booking,
  });
});

/**
 * @desc      Create booking
 * @route     POST /api/v1/bookings
 * @access    Private/Manager/Customer
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.createBooking = asyncHandler(async (req, res, next) => {
  const booking = await bookingService.createBooking(req.body, req.user.id);

  res.status(201).json({
    success: true,
    data: booking,
  });
});

/**
 * @desc      Update booking
 * @route     PUT /api/v1/bookings/:id
 * @access    Private/Manager/Customer
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.updateBooking = asyncHandler(async (req, res, next) => {
  const booking = await bookingService.updateBooking(
    req.params.id,
    req.body,
    req.user.id,
    req.user.role.name,
  );

  res.status(200).json({
    success: true,
    data: booking,
  });
});

/**
 * @desc      Delete booking
 * @route     DELETE /api/v1/bookings/:id
 * @access    Private/Manager/Customer
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.deleteBooking = asyncHandler(async (req, res, next) => {
  await bookingService.deleteBooking(req.params.id, req.user.id, req.user.role.name);

  res.status(200).json({
    success: true,
    data: {},
  });
});
