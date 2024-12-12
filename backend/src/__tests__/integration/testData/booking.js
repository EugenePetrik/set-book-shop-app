const { faker } = require('@faker-js/faker');
const { addDays } = require('date-fns');
const Booking = require('../../../models/Booking');
const BookingStatus = require('../../../models/BookingStatus');

async function getBookingStatusId(name = 'SUBMITTED') {
  const status = await BookingStatus.findOne({ name });
  return status._id;
}

function generateBookingData(userId, productId, statusId) {
  return {
    user: userId,
    product: productId,
    status: statusId,
    delivery_address: faker.location.streetAddress(),
    date: addDays(new Date(), 10).toISOString().split('T')[0],
    time: '11:00 AM',
    quantity: faker.number.int({ min: 1, max: 3 }),
  };
}

async function getBooking(userId, productId) {
  const statusId = await getBookingStatusId();
  return generateBookingData(userId, productId, statusId);
}

function getUpdateBookingData() {
  return {
    delivery_address: faker.location.streetAddress(),
    date: addDays(new Date(), 10).toISOString().split('T')[0],
    time: '11:00 AM',
    quantity: faker.number.int({ min: 1, max: 3 }),
  };
}

async function createBooking(userId, productId) {
  const statusId = await getBookingStatusId();
  const bookingData = generateBookingData(userId, productId, statusId);
  const booking = await Booking.create(bookingData);
  return booking;
}

module.exports = { getBooking, getUpdateBookingData, createBooking, getBookingStatusId };
