const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { createCustomer } = require('../testData/user');
const { createBooking } = require('../testData/booking');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithStore } = require('../testData/product');

describe('Booking API - GET /api/v1/bookings/:id', () => {
  let app;
  let booking;

  beforeAll(async () => {
    app = createApp();
    const user = await createCustomer();
    const { product } = await createProductWithStore();
    booking = await createBooking(user._id.toString(), product._id.toString());
  });

  const performGetBooking = async (bookingId, token) =>
    request(app)
      .get(`/api/v1/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${token}`);

  it('should get booking by ID for manager', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);

    const response = await performGetBooking(booking._id, token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id', booking._id.toString());
    expect(response.body.data).toHaveProperty('product');
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data).toHaveProperty('status');
    expect(response.body.data).toHaveProperty(
      'delivery_address',
      booking.delivery_address,
    );
    expect(response.body.data).toHaveProperty('date', booking.date);
    expect(response.body.data).toHaveProperty('time', booking.time);
    expect(response.body.data).toHaveProperty('quantity', booking.quantity);
  });

  it('should return 401 if user is not authorized', async () => {
    const response = await performGetBooking(booking._id);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should return 404 if booking not found', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const nonExistentId = '60c72b2f9b1e8b0f8cf9b6e4';

    const response = await performGetBooking(nonExistentId, token);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 403 if the user is not authorized to access the booking', async () => {
    const customer = await createCustomer();
    const token = generateToken(customer._id);

    const response = await performGetBooking(booking._id, token);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Not authorized to access this booking');
  });
});
