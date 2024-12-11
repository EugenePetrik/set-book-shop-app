const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { getUserIdByRole } = require('../testData/user');
const { createCustomer } = require('../testData/user');
const { createBooking, getUpdateBookingData } = require('../testData/booking');
const {
  createProductWithStore,
  createProductWithoutStore,
} = require('../testData/product');

describe('Booking API - PUT /api/v1/bookings/:id', () => {
  let app;
  let booking;

  beforeAll(async () => {
    app = createApp();
    const user = await createCustomer();
    const { product } = await createProductWithStore();
    booking = await createBooking(user._id.toString(), product._id.toString());
  });

  const performUpdateBooking = async (bookingId, updatedData, token) =>
    request(app)
      .put(`/api/v1/bookings/${bookingId}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`);

  it('should update a booking', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const updatedData = getUpdateBookingData();

    const response = await performUpdateBooking(booking._id, updatedData, token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      _id: booking._id.toString(),
      delivery_address: updatedData.delivery_address,
      date: updatedData.date,
      time: updatedData.time,
      quantity: updatedData.quantity,
    });
  });

  it('should return 404 if booking not found', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const invalidBookingId = '60c72b2f9b1e8b0f8cf9b6e4';
    const updatedData = getUpdateBookingData();

    const response = await performUpdateBooking(invalidBookingId, updatedData, token);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 403 if user is not authorized', async () => {
    const userId = await getUserIdByRole('CUSTOMER');
    const token = generateToken(userId);
    const updatedData = getUpdateBookingData();

    const response = await performUpdateBooking(booking._id, updatedData, token);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it('should return 404 if store item is not found for the given product', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const product = await createProductWithoutStore();
    const bookingToUpdate = await createBooking(
      userId.toString(),
      product._id.toString(),
    );
    const updatedData = getUpdateBookingData();

    const response = await performUpdateBooking(bookingToUpdate._id, updatedData, token);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Store item not found for the given product');
  });

  it('should return 400 if not enough available quantity to update the booking', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const { product } = await createProductWithStore();
    const bookingToUpdate = await createBooking(
      userId.toString(),
      product._id.toString(),
    );

    const response = await performUpdateBooking(
      bookingToUpdate._id,
      { quantity: 1000 },
      token,
    );

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'Not enough available quantity to update the booking',
    );
  });
});
