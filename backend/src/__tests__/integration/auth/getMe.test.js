const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Auth API - GET /api/v1/auth/me', () => {
  let app;
  let token;

  beforeAll(async () => {
    app = createApp();
    const adminUserId = await getUserIdByRole('ADMIN');
    token = generateToken(adminUserId);
  });

  it('should get the current logged-in user', async () => {
    const response = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      _id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      login: expect.any(String),
      address: expect.any(String),
      phone: expect.any(String),
      role: {
        _id: expect.any(String),
        name: expect.any(String),
      },
    });
  });

  it('should not get user details without token', async () => {
    const response = await request(app).get('/api/v1/auth/me');

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
