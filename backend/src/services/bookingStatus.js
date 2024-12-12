const BookingStatus = require('../models/BookingStatus');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Get all booking statuses.
 *
 * @returns  {Promise<Array>} A list of booking statuses.
 */
exports.getBookingStatuses = async () => {
  return BookingStatus.find();
};

/**
 * Get a specific booking status by ID.
 *
 * @param    {string} id - The ID of the booking status.
 * @returns  {Promise<Object>} The booking status.
 * @throws   {ErrorResponse} If the booking status is not found.
 */
exports.getBookingStatusById = async id => {
  const bookingStatus = await BookingStatus.findById(id);

  if (!bookingStatus) {
    throw new ErrorResponse(`Booking status not found with id of ${id}`, 404);
  }

  return bookingStatus;
};

/**
 * Create a new booking status.
 *
 * @param    {Object} statusData - The data for the new booking status.
 * @returns  {Promise<Object>} The newly created booking status.
 */
exports.createBookingStatus = async statusData => {
  const status = new BookingStatus(statusData);
  return status.save();
};

/**
 * Update a booking status.
 *
 * @param    {string} id - The ID of the booking status to update.
 * @param    {Object} statusData - The data to update the booking status with.
 * @returns  {Promise<Object>} The updated booking status.
 * @throws   {ErrorResponse} If the booking status is not found.
 */
exports.updateBookingStatus = async (id, statusData) => {
  const bookingStatus = await BookingStatus.findById(id);

  if (!bookingStatus) {
    throw new ErrorResponse(`Booking status not found with id of ${id}`, 404);
  }

  return BookingStatus.findByIdAndUpdate(id, statusData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete a booking status.
 *
 * @param    {string} id - The ID of the booking status to delete.
 * @returns  {Promise<void>}
 * @throws   {ErrorResponse} If the booking status is not found.
 */
exports.deleteBookingStatus = async id => {
  const bookingStatus = await BookingStatus.findById(id);

  if (!bookingStatus) {
    throw new ErrorResponse(`Booking status not found with id of ${id}`, 404);
  }

  await BookingStatus.findByIdAndDelete(id);
};
