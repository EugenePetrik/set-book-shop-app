const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { createCustomer } = require('../testData/user');
const { createBooking } = require('../testData/booking');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithStore } = require('../testData/product');

describe('Booking API - GET /api/v1/bookings', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    const user = await createCustomer();
    const { product } = await createProductWithStore();
    await createBooking(user._id.toString(), product._id.toString());
  });

  const performGetBookings = async token =>
    request(app).get('/api/v1/bookings').set('Authorization', `Bearer ${token}`);

  it('should get all bookings for manager', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);

    const response = await performGetBookings(token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should return 403 if user is not a manager', async () => {
    const userId = await getUserIdByRole('ADMIN');
    const token = generateToken(userId);

    const response = await performGetBookings(token);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });
});
