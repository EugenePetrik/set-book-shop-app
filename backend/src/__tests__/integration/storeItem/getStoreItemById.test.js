const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithStore } = require('../testData/product');
const { generateToken } = require('../utils/generateToken');

describe('StoreItems API - GET /api/v1/store-items/:id', () => {
  let app;
  let storeItem;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    const result = await createProductWithStore();
    storeItem = result.storeItem;
  });

  const getStoreItemRequest = async (token, storeItemId) => {
    return request(app)
      .get(`/api/v1/store-items/${storeItemId}`)
      .set('Authorization', `Bearer ${token}`);
  };

  describe('manager', () => {
    it('should get a store item by ID', async () => {
      const userId = await getUserIdByRole('MANAGER');
      const token = generateToken(userId);

      const response = await getStoreItemRequest(token, storeItem._id);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id', storeItem._id.toString());
      expect(response.body.data).toHaveProperty('available_qty', storeItem.available_qty);
      expect(response.body.data).toHaveProperty('booked_qty', storeItem.booked_qty);
      expect(response.body.data).toHaveProperty('sold_qty', storeItem.sold_qty);
    });
  });

  describe('admin', () => {
    it('should not get store item', async () => {
      const userId = await getUserIdByRole('ADMIN');
      const token = generateToken(userId);

      const response = await getStoreItemRequest(token, storeItem._id);

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('customer', () => {
    it('should not get store item', async () => {
      const userId = await getUserIdByRole('CUSTOMER');
      const token = generateToken(userId);

      const response = await getStoreItemRequest(token, storeItem._id);

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('unauthorized user', () => {
    it('should not get store item', async () => {
      const response = await request(app).get(`/api/v1/store-items/${storeItem._id}`);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  it('should return 404 if store item is not found', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const nonExistentId = '609e24cce0a21a1b74c8d107';

    const response = await getStoreItemRequest(token, nonExistentId);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(`Store item not found with id of ${nonExistentId}`);
  });
});
