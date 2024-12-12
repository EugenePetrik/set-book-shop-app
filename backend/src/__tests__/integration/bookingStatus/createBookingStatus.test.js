const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('BookingStatus API - POST /api/v1/booking-statuses', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  const postBookingStatus = (token, status) =>
    request(app)
      .post('/api/v1/booking-statuses')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: status });

  it('should return 400 if booking status already exists', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);

    const response = await postBookingStatus(token, 'COMPLETED');

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await postBookingStatus(null, 'REJECTED');

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
