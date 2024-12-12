const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithStore } = require('../testData/product');
const { generateToken } = require('../utils/generateToken');

describe('StoreItems API - DELETE /api/v1/store-items/:id', () => {
  let app;
  let storeItem;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    const result = await createProductWithStore();
    storeItem = result.storeItem;
  });

  const deleteStoreItemRequest = async (token, storeItemId) => {
    return request(app)
      .delete(`/api/v1/store-items/${storeItemId}`)
      .set('Authorization', `Bearer ${token}`);
  };

  describe('manager', () => {
    it('should delete a store item by ID', async () => {
      const userId = await getUserIdByRole('MANAGER');
      const token = generateToken(userId);

      const response = await deleteStoreItemRequest(token, storeItem._id);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('unauthorized user', () => {
    it('should not delete a store item', async () => {
      const response = await request(app).delete(`/api/v1/store-items/${storeItem._id}`);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('customer', () => {
    it('should not delete a store item', async () => {
      const userId = await getUserIdByRole('CUSTOMER');
      const token = generateToken(userId);

      const response = await deleteStoreItemRequest(token, storeItem._id);

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('invalid store item ID', () => {
    it('should return 404 for non-existent store item ID', async () => {
      const userId = await getUserIdByRole('MANAGER');
      const token = generateToken(userId);
      const nonExistentId = '000000000000000000000000';

      const response = await deleteStoreItemRequest(token, nonExistentId);

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
