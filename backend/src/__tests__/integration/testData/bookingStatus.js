const BookingStatus = require('../../../models/BookingStatus');

async function getBookingStatus(name) {
  return BookingStatus.findOne({ name });
}

module.exports = { getBookingStatus };
