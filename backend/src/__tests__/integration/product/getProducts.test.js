const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { getUserIdByRole } = require('../testData/user');

describe('Product API - GET /api/v1/products', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  const getProductsRequest = async role => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);
    return request(app).get('/api/v1/products').set('Authorization', `Bearer ${token}`);
  };

  describe('authorized users', () => {
    it('should get all products for admin', async () => {
      const response = await getProductsRequest('ADMIN');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(1);
    });

    it('should get all products for manager', async () => {
      const response = await getProductsRequest('MANAGER');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(1);
    });

    it('should get all products for customer', async () => {
      const response = await getProductsRequest('CUSTOMER');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(1);
    });
  });

  describe('unauthorized user', () => {
    it('should not get products', async () => {
      const response = await request(app).get('/api/v1/products');

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
