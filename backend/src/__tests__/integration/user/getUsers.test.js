const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Users API - GET /api/v1/users', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  const getUsers = async role => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);

    return request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`);
  };

  describe('admin', () => {
    it('should get all users', async () => {
      const response = await getUsers('ADMIN');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(1);
    });
  });

  describe('manager', () => {
    it('should get all users', async () => {
      const response = await getUsers('MANAGER');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(1);
    });
  });

  describe('customer', () => {
    it('should not get users', async () => {
      const response = await getUsers('CUSTOMER');

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('unauthorized user', () => {
    it('should not get users', async () => {
      const response = await request(app).get('/api/v1/users');

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
