const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getBookingStatus } = require('../testData/bookingStatus');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('BookingStatus API - DELETE /api/v1/booking-statuses/:id', () => {
  let app;
  let token;
  let bookingStatus;

  beforeAll(async () => {
    app = createApp();
    bookingStatus = await getBookingStatus('SUBMITTED');
    const userId = await getUserIdByRole('MANAGER');
    token = generateToken(userId);
  });

  const deleteBookingStatus = (id, authToken) =>
    request(app)
      .delete(`/api/v1/booking-statuses/${id}`)
      .set('Authorization', `Bearer ${authToken}`);

  it('should return 404 if booking status not found', async () => {
    const nonExistentId = '609e24cce0a21a1b74c8d107';

    const response = await deleteBookingStatus(nonExistentId, token);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await deleteBookingStatus(bookingStatus._id);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
