const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithoutStore } = require('../testData/product');
const { generateToken } = require('../utils/generateToken');

describe('StoreItems API - POST /api/v1/store-items', () => {
  let app;
  let product;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    product = await createProductWithoutStore();
  });

  const createStoreItemRequest = async (token, storeItemData) => {
    return request(app)
      .post('/api/v1/store-items')
      .set('Authorization', `Bearer ${token}`)
      .send(storeItemData);
  };

  describe('manager', () => {
    it('should create a store item', async () => {
      const userId = await getUserIdByRole('MANAGER');
      const token = generateToken(userId);
      const storeItemData = {
        product: product._id,
        available_qty: 10,
        booked_qty: 5,
        sold_qty: 2,
      };

      const response = await createStoreItemRequest(token, storeItemData);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('product');
      expect(response.body.data).toHaveProperty(
        'available_qty',
        storeItemData.available_qty,
      );
      expect(response.body.data).toHaveProperty('booked_qty', storeItemData.booked_qty);
      expect(response.body.data).toHaveProperty('sold_qty', storeItemData.sold_qty);
    });
  });

  describe('unauthorized user', () => {
    it('should not create a store item', async () => {
      const storeItemData = {
        product: product._id,
        available_qty: 10,
        booked_qty: 5,
        sold_qty: 2,
      };

      const response = await request(app).post('/api/v1/store-items').send(storeItemData);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  it('should return 400 if required fields are missing', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);

    const response = await createStoreItemRequest(token, {});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
