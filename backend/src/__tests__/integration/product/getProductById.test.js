const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithoutStore } = require('../testData/product');

describe('Product API - GET /api/v1/products/:id', () => {
  let app;
  let product;

  beforeAll(async () => {
    app = createApp();
    product = await createProductWithoutStore();
  });

  const getProductRequest = async (role, productId) => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);
    return request(app)
      .get(`/api/v1/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);
  };

  describe('authorized users', () => {
    it('should get a product by ID for manager', async () => {
      const response = await getProductRequest('MANAGER', product._id);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        author: product.author,
        price: product.price,
        image_path: product.image_path,
        slug: expect.any(String),
      });
    });

    it('should get a product by ID for customer', async () => {
      const response = await getProductRequest('CUSTOMER', product._id);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        author: product.author,
        price: product.price,
        image_path: product.image_path,
        slug: expect.any(String),
      });
    });
  });

  describe('unauthorized user', () => {
    it('should not get a product', async () => {
      const response = await request(app).get(`/api/v1/products/${product._id}`);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('invalid product ID', () => {
    it('should return 404 for non-existent product ID', async () => {
      const nonExistentId = '000000000000000000000000';

      const response = await getProductRequest('MANAGER', nonExistentId);

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
