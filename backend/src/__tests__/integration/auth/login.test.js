const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { createApp } = require('../../../createApp');
const { getUser, users } = require('../testData/user');

describe('Auth API - POST /api/v1/auth/login', () => {
  let app;
  let validUser;

  beforeAll(() => {
    app = createApp();
    validUser = getUser('ADMIN');
  });

  const performLogin = userData => request(app).post('/api/v1/auth/login').send(userData);

  it('should login a user', async () => {
    const response = await performLogin(validUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('token');
  });

  it.each([
    [{ password: 'password' }, 'Please provide an email and password'],
    [{ email: users.customer.email }, 'Please provide an email and password'],
  ])(
    'should return 400 if email or password is not provided',
    async (userData, errorMsg) => {
      const response = await performLogin(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe(errorMsg);
    },
  );

  it('should return 401 if user is not found', async () => {
    const invalidUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await performLogin(invalidUser);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should return 401 if password does not match', async () => {
    const response = await performLogin({
      email: users.customer.email,
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Invalid credentials');
  });
});
