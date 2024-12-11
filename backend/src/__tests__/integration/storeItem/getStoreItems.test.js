const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithStore } = require('../testData/product');
const { generateToken } = require('../utils/generateToken');

describe('StoreItems API - GET /api/v1/store-items', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    await createProductWithStore();
  });

  const getStoreItemsRequest = async token => {
    return request(app)
      .get('/api/v1/store-items')
      .set('Authorization', `Bearer ${token}`);
  };

  const testGetAllStoreItems = async (role, expectedStatusCode) => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);

    const response = await getStoreItemsRequest(token);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.success).toBe(expectedStatusCode === 200);
    if (expectedStatusCode === 200) {
      expect(response.body.data.length).toBeGreaterThan(0);
    }
  };

  describe('manager', () => {
    it('should get all store items', async () => {
      await testGetAllStoreItems('MANAGER', 200);
    });
  });

  describe('admin', () => {
    it('should not get store items', async () => {
      await testGetAllStoreItems('ADMIN', 403);
    });
  });

  describe('customer', () => {
    it('should not get store items', async () => {
      await testGetAllStoreItems('CUSTOMER', 403);
    });
  });

  describe('unauthorized user', () => {
    it('should not get store items', async () => {
      const response = await request(app).get('/api/v1/store-items');

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
