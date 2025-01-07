const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getNewCustomer, getUser } = require('../testData/user');

describe('Auth API - POST /api/v1/auth/register', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  it('should register a new user', async () => {
    const user = await getNewCustomer();

    const response = await request(app).post('/api/v1/auth/register').send(user);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('token');
  });

  it('should not register a user with existing email', async () => {
    const user = await getNewCustomer();
    user.email = getUser('ADMIN').email;

    const response = await request(app).post('/api/v1/auth/register').send(user);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
