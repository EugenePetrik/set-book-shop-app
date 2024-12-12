const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole, createCustomer } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Users API - GET /api/v1/users/:id', () => {
  let app;
  let user;
  let userIdToFind;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    user = await createCustomer();
    userIdToFind = user._id;
  });

  const getUser = async role => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);

    return request(app)
      .get(`/api/v1/users/${userIdToFind}`)
      .set('Authorization', `Bearer ${token}`);
  };

  describe('admin', () => {
    it('should get a user by ID', async () => {
      const response = await getUser('ADMIN');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id', userIdToFind.toString());
      expect(response.body.data).toHaveProperty('name', user.name);
      expect(response.body.data).toHaveProperty('role');
      expect(response.body.data).toHaveProperty('email', user.email);
      expect(response.body.data).toHaveProperty('phone', user.phone);
      expect(response.body.data).toHaveProperty('address', user.address);
      expect(response.body.data).toHaveProperty('login', user.login);
    });
  });

  describe('manager', () => {
    it('should get a user by ID', async () => {
      const response = await getUser('MANAGER');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id', userIdToFind.toString());
      expect(response.body.data).toHaveProperty('name', user.name);
      expect(response.body.data).toHaveProperty('role');
      expect(response.body.data).toHaveProperty('email', user.email);
      expect(response.body.data).toHaveProperty('phone', user.phone);
      expect(response.body.data).toHaveProperty('address', user.address);
      expect(response.body.data).toHaveProperty('login', user.login);
    });
  });

  describe('customer', () => {
    it('should not get a user', async () => {
      const response = await getUser('CUSTOMER');

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('unauthorized user', () => {
    it('should not get a user', async () => {
      const response = await request(app).get(`/api/v1/users/${userIdToFind}`);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  it('should return 404 if user is not found', async () => {
    const nonExistentId = '609e24cce0a21a1b74c8d107';
    const userId = await getUserIdByRole('ADMIN');
    const token = generateToken(userId);

    const response = await request(app)
      .get(`/api/v1/users/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(`User not found with id of ${nonExistentId}`);
  });
});
