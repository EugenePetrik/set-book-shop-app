const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getBookingStatus } = require('../testData/bookingStatus');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('BookingStatus API - GET /api/v1/booking-statuses/:id', () => {
  let app;
  let token;
  let bookingStatus;

  beforeAll(async () => {
    app = createApp();
    bookingStatus = await getBookingStatus('SUBMITTED');
    const userId = await getUserIdByRole('MANAGER');
    token = generateToken(userId);
  });

  const getBookingStatusById = (id, authToken) =>
    request(app)
      .get(`/api/v1/booking-statuses/${id}`)
      .set('Authorization', `Bearer ${authToken}`);

  it('should get a specific booking status by ID', async () => {
    const response = await getBookingStatusById(bookingStatus._id, token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id', bookingStatus._id.toString());
    expect(response.body.data).toHaveProperty('name', 'SUBMITTED');
  });

  it('should return 404 if booking status not found', async () => {
    const nonExistentId = '609e24cce0a21a1b74c8d107';
    const response = await getBookingStatusById(nonExistentId, token);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await getBookingStatusById(bookingStatus._id);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
