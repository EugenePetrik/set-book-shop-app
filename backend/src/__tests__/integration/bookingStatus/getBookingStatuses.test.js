const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('BookingStatus API - GET /api/v1/booking-statuses', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  const getBookingStatuses = authToken =>
    request(app)
      .get('/api/v1/booking-statuses')
      .set('Authorization', `Bearer ${authToken}`);

  it('should get all booking statuses', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);

    const response = await getBookingStatuses(token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await getBookingStatuses();

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
