const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { getUserIdByRole } = require('../testData/user');
const { createCustomer } = require('../testData/user');
const { createBooking } = require('../testData/booking');
const { createProductWithStore } = require('../testData/product');
const { retryAsync } = require('../utils/retryAsync');

describe('Booking API - DELETE /api/v1/bookings/:id', () => {
  let app;
  let booking;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    const user = await createCustomer();
    const { product } = await createProductWithStore();
    booking = await createBooking(user._id, product._id);
  });

  const performDelete = async (bookingId, token) =>
    request(app)
      .delete(`/api/v1/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${token}`);

  it('should delete a booking', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);

    await performDelete(booking._id, token);

    await retryAsync(async () => {
      const response = await request(app)
        .get(`/api/v1/bookings/${booking._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  it('should return 404 if booking not found', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const invalidBookingId = '60c72b2f9b1e8b0f8cf9b6e4';

    const response = await performDelete(invalidBookingId, token);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 if user is not authorized', async () => {
    const response = await request(app).delete(`/api/v1/bookings/${booking._id}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should return 403 if user is not authorized to delete the booking', async () => {
    const customer = await createCustomer();
    const token = generateToken(customer._id);

    const userId = await getUserIdByRole('MANAGER');
    const { product } = await createProductWithStore();
    const bookingToDelete = await createBooking(
      userId.toString(),
      product._id.toString(),
    );

    const response = await performDelete(bookingToDelete._id, token);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Not authorized to delete this booking');
  });
});
