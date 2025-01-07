const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { createApp } = require('../../../createApp');
const { createCustomer } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Auth API - PUT /api/v1/auth/update-details', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  it('should update user details', async () => {
    const user = await createCustomer();
    const token = generateToken(user._id);
    const newName = faker.person.fullName();

    const response = await request(app)
      .put('/api/v1/auth/update-details')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: newName });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id', user._id.toString());
    expect(response.body.data).toHaveProperty('email', user.email);
    expect(response.body.data).toHaveProperty('login', user.login);
    expect(response.body.data).toHaveProperty('name', newName);
    expect(response.body.data).toHaveProperty('address', user.address);
    expect(response.body.data).toHaveProperty('phone', user.phone);
    expect(response.body.data).toHaveProperty('role');
  });

  it('should not update details without token', async () => {
    const response = await request(app).put('/api/v1/auth/update-details').send({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
