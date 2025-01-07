const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole, getNewCustomer } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Users API - POST /api/v1/users', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  const createUser = async (user, role) => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);

    return request(app)
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user);
  };

  describe('admin', () => {
    it('should create a new user', async () => {
      const user = await getNewCustomer();

      const response = await createUser(user, 'ADMIN');

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('name', user.name);
      expect(response.body.data).toHaveProperty('email', user.email);
      expect(response.body.data).toHaveProperty('role');
      expect(response.body.data).toHaveProperty('phone', user.phone);
      expect(response.body.data).toHaveProperty('address', user.address);
      expect(response.body.data).toHaveProperty('login', user.login);
      expect(response.body.data).toHaveProperty('password');
    });
  });

  describe('manager', () => {
    it('should create a new user', async () => {
      const user = await getNewCustomer();

      const response = await createUser(user, 'MANAGER');

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('name', user.name);
      expect(response.body.data).toHaveProperty('email', user.email);
      expect(response.body.data).toHaveProperty('role');
      expect(response.body.data).toHaveProperty('phone', user.phone);
      expect(response.body.data).toHaveProperty('address', user.address);
      expect(response.body.data).toHaveProperty('login', user.login);
      expect(response.body.data).toHaveProperty('password');
    });
  });

  describe('customer', () => {
    it('should not create a new user', async () => {
      const user = await getNewCustomer();

      const response = await createUser(user, 'CUSTOMER');

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('unauthorized user', () => {
    it('should not create a new user', async () => {
      const user = await getNewCustomer();

      const response = await request(app).post('/api/v1/users').send(user);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  it('should return 400 if required fields are missing', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);

    const response = await request(app)
      .post('/api/v1/users')
      .send({})
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
