const Booking = require('../models/Booking');
const StoreItem = require('../models/StoreItem');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Get all bookings for a manager.
 *
 * @param    {string} userRole - The role of the user.
 * @returns  {Promise<Array>} A list of bookings.
 * @throws   {ErrorResponse} If the user is not authorized to access bookings.
 */
exports.getBookings = async () => {
  return Booking.find().populate([
    {
      path: 'product',
      select: '_id name slug description author price image_path',
    },
    {
      path: 'user',
      select: '_id name email',
    },
    {
      path: 'status',
      select: '_id name',
    },
  ]);
};

/**
 * Get a specific booking by ID.
 *
 * @param    {string} id - The ID of the booking.
 * @param    {string} userId - The ID of the user requesting the booking.
 * @param    {string} userRole - The role of the user.
 * @returns  {Promise<Object>} The booking.
 * @throws   {ErrorResponse} If the booking is not found or the user is not authorized to access it.
 */
exports.getBookingById = async (id, userId, userRole) => {
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new ErrorResponse(`Booking not found with id of ${id}`, 404);
  }

  // Check if the user is authorized to get specific booking
  if (userRole !== 'MANAGER' && booking.user._id.toString() !== userId) {
    throw new ErrorResponse('Not authorized to access this booking', 403);
  }

  return booking.populate([
    {
      path: 'product',
      select: '_id name slug description author price image_path',
    },
    {
      path: 'user',
      select: '_id name email',
    },
    {
      path: 'status',
      select: '_id name',
    },
  ]);
};

/**
 * Create a new booking.
 *
 * @param    {Object} bookingData - The data for the new booking.
 * @param    {string} bookingData.product - The product ID for the booking.
 * @param    {string} bookingData.delivery_address - The delivery address for the booking.
 * @param    {string} bookingData.date - The date of the booking.
 * @param    {string} bookingData.time - The time of the booking.
 * @param    {string} bookingData.status - The status of the booking.
 * @param    {number} bookingData.quantity - The quantity of the booking.
 * @param    {string} userId - The ID of the user making the booking.
 * @returns  {Promise<Object>} The newly created booking.
 * @throws   {ErrorResponse} If required fields are missing or if there is not enough available quantity.
 */
exports.createBooking = async (bookingData, userId) => {
  // Add user to req.body
  bookingData.user = userId;

  const requiredFields = [
    'product',
    'delivery_address',
    'date',
    'time',
    'status',
    'quantity',
  ];

  for (const field of requiredFields) {
    if (!bookingData[field]) {
      throw new ErrorResponse(`Please provide a ${field}`, 400);
    }
  }

  const storeItem = await StoreItem.findOne({ product: bookingData.product });

  if (!storeItem) {
    throw new ErrorResponse('Store item not found for the given product', 404);
  }

  if (storeItem.available_qty < bookingData.quantity) {
    throw new ErrorResponse('Not enough available quantity to fulfill the booking', 400);
  }

  const booking = new Booking(bookingData);
  const savedBooking = await booking.save();

  storeItem.booked_qty += savedBooking.quantity;
  storeItem.available_qty -= savedBooking.quantity;

  await storeItem.save();

  return savedBooking.populate([
    {
      path: 'product',
      select: '_id name slug description author price image_path',
    },
    {
      path: 'user',
      select: '_id name email',
    },
    {
      path: 'status',
      select: '_id name',
    },
  ]);
};

/**
 * Update a booking.
 *
 * @param    {string} bookingId - The ID of the booking to update.
 * @param    {Object} bookingData - The data to update the booking with.
 * @param    {string} bookingData.product - The product ID for the booking.
 * @param    {string} bookingData.delivery_address - The delivery address for the booking.
 * @param    {string} bookingData.date - The date of the booking.
 * @param    {string} bookingData.time - The time of the booking.
 * @param    {string} bookingData.status - The status of the booking.
 * @param    {number} bookingData.quantity - The quantity of the booking.
 * @param    {string} userId - The ID of the user making the booking.
 * @param    {string} userRole - The role of the user.
 * @returns  {Promise<Object>} The updated booking.
 * @throws   {ErrorResponse} If the booking is not found or the user is not authorized to update it.
 */
exports.updateBooking = async (bookingId, bookingData, userId, userRole) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ErrorResponse(`Booking not found with id of ${bookingId}`, 404);
  }

  // Check if the user is authorized to update the booking
  if (userRole !== 'MANAGER' && booking.user._id.toString() !== userId) {
    throw new ErrorResponse('Not authorized to update this booking', 403);
  }

  const storeItem = await StoreItem.findOne({ product: booking.product });

  if (!storeItem) {
    throw new ErrorResponse('Store item not found for the given product', 404);
  }

  if (bookingData.quantity != null) {
    const quantityDifference = bookingData.quantity - booking.quantity;

    if (quantityDifference > 0 && storeItem.available_qty < quantityDifference) {
      throw new ErrorResponse('Not enough available quantity to update the booking', 400);
    }

    // Adjust quantities based on the difference in quantities
    if (quantityDifference !== 0) {
      storeItem.booked_qty += quantityDifference;
      storeItem.available_qty -= quantityDifference;
    }
  }

  Object.assign(booking, bookingData);

  const updatedBooking = await booking.save();

  // Adjust quantities based on the status change
  const currentStatus = booking.status.toString();
  const newStatus = bookingData.status?.toString();

  if (newStatus != null && newStatus !== currentStatus) {
    if (currentStatus === 'APPROVED' && newStatus === 'IN_DELIVERY') {
      storeItem.booked_qty -= updatedBooking.quantity;
      storeItem.sold_qty += updatedBooking.quantity;
    } else if (currentStatus === 'IN_DELIVERY' && newStatus === 'COMPLETED') {
      storeItem.sold_qty += updatedBooking.quantity;
    } else if (currentStatus === 'APPROVED' && newStatus === 'CANCELED') {
      storeItem.booked_qty -= updatedBooking.quantity;
      storeItem.available_qty += updatedBooking.quantity;
    }
  }

  await storeItem.save();

  await updatedBooking.populate([
    {
      path: 'product',
      select: '_id name slug description author price image_path',
    },
    {
      path: 'user',
      select: '_id name email',
    },
    {
      path: 'status',
      select: '_id name',
    },
  ]);

  return updatedBooking;
};

/**
 * Delete a booking.
 *
 * @param    {string} id - The ID of the booking to delete.
 * @param    {string} userId - The ID of the user making the request.
 * @param    {string} userRole - The role of the user.
 * @returns  {Promise<void>}
 * @throws   {ErrorResponse} If the booking is not found or the user is not authorized to delete it.
 */
exports.deleteBooking = async (id, userId, userRole) => {
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new ErrorResponse(`Booking not found with id of ${id}`, 404);
  }

  // Check if the user is authorized to delete the booking
  if (userRole !== 'MANAGER' && booking.user._id.toString() !== userId) {
    throw new ErrorResponse('Not authorized to delete this booking', 403);
  }

  await Booking.findByIdAndDelete(id);

  const storeItem = await StoreItem.findOne({ product: booking.product });

  if (!storeItem) {
    throw new ErrorResponse('Store item not found for the given product', 400);
  }

  // Adjust quantities
  storeItem.booked_qty -= booking.quantity;
  storeItem.available_qty += booking.quantity;

  await storeItem.save();
};
