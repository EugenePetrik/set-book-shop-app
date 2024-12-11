const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getBookingStatus } = require('../testData/bookingStatus');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('BookingStatus API - PUT /api/v1/booking-statuses/:id', () => {
  let app;
  let token;
  let bookingStatus;

  beforeAll(async () => {
    app = createApp();
    bookingStatus = await getBookingStatus('SUBMITTED');
    const userId = await getUserIdByRole('MANAGER');
    token = generateToken(userId);
  });

  const updateBookingStatus = (id, authToken, data) =>
    request(app)
      .put(`/api/v1/booking-statuses/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(data);

  it('should return 404 if booking status not found', async () => {
    const nonExistentId = '609e24cce0a21a1b74c8d107';
    const response = await updateBookingStatus(nonExistentId, token, {
      name: 'IN_DELIVERY',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await updateBookingStatus(bookingStatus._id, '', {
      name: 'IN_DELIVERY',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
