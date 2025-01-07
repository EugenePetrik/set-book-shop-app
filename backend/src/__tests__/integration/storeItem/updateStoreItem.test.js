const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithStore } = require('../testData/product');
const { generateToken } = require('../utils/generateToken');

describe('StoreItems API - PUT /api/v1/store-items/:id', () => {
  let app;
  let storeItem;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    const result = await createProductWithStore();
    storeItem = result.storeItem;
  });

  const updateStoreItemRequest = async (itemId, role, updatedData) => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);

    return request(app)
      .put(`/api/v1/store-items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);
  };

  describe('manager', () => {
    it('should update a store item by ID', async () => {
      const updatedData = {
        available_qty: faker.number.int({ min: 30, max: 100 }),
        booked_qty: faker.number.int({ min: 10, max: 20 }),
        sold_qty: faker.number.int({ min: 5, max: 10 }),
      };

      const response = await updateStoreItemRequest(
        storeItem._id,
        'MANAGER',
        updatedData,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty(
        'available_qty',
        updatedData.available_qty,
      );
      expect(response.body.data).toHaveProperty('booked_qty', updatedData.booked_qty);
      expect(response.body.data).toHaveProperty('sold_qty', updatedData.sold_qty);
    });
  });

  it('should return 404 if store item is not found', async () => {
    const nonExistentId = '609e24cce0a21a1b74c8d107';

    const response = await updateStoreItemRequest(nonExistentId, 'MANAGER', {
      available_qty: faker.number.int({ min: 30, max: 100 }),
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(`Store item not found with id of ${nonExistentId}`);
  });
});
