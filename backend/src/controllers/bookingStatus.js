const bookingStatusService = require('../services/bookingStatus');
const asyncHandler = require('../middleware/async');

/**
 * @desc      Get booking statuses
 * @route     GET /api/v1/booking-statuses
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getBookingStatuses = asyncHandler(async (req, res, next) => {
  const bookingStatuses = await bookingStatusService.getBookingStatuses();

  res.status(200).json({
    success: true,
    data: bookingStatuses,
  });
});

/**
 * @desc      Get specific booking status
 * @route     GET /api/v1/booking-statuses/:id
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getBookingStatusById = asyncHandler(async (req, res, next) => {
  const bookingStatus = await bookingStatusService.getBookingStatusById(req.params.id);

  res.status(200).json({
    success: true,
    data: bookingStatus,
  });
});

/**
 * @desc      Create booking status
 * @route     POST /api/v1/booking-statuses
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.createBookingStatus = asyncHandler(async (req, res, next) => {
  const bookingStatus = await bookingStatusService.createBookingStatus(req.body);

  res.status(201).json({
    success: true,
    data: bookingStatus,
  });
});

/**
 * @desc      Update booking status
 * @route     PUT /api/v1/booking-statuses/:id
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.updateBookingStatus = asyncHandler(async (req, res, next) => {
  const bookingStatus = await bookingStatusService.updateBookingStatus(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    data: bookingStatus,
  });
});

/**
 * @desc      Delete booking status
 * @route     DELETE /api/v1/booking-statuses/:id
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.deleteBookingStatus = asyncHandler(async (req, res, next) => {
  await bookingStatusService.deleteBookingStatus(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
