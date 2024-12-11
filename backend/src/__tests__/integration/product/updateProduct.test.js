const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithoutStore, generateProductData } = require('../testData/product');

describe('Product API - PUT /api/v1/products/:id', () => {
  let app;
  let product;
  let updatedProductData;

  beforeAll(async () => {
    app = createApp();
    product = await createProductWithoutStore();
    updatedProductData = generateProductData();
  });

  const updateProductRequest = async (productId, token, updatedData) => {
    return request(app)
      .put(`/api/v1/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);
  };

  describe('manager', () => {
    it('should update a product by ID', async () => {
      const userId = await getUserIdByRole('MANAGER');
      const token = generateToken(userId);

      const response = await updateProductRequest(product._id, token, updatedProductData);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('name', updatedProductData.name);
      expect(response.body.data).toHaveProperty(
        'description',
        updatedProductData.description,
      );
      expect(response.body.data).toHaveProperty('author', updatedProductData.author);
      expect(response.body.data).toHaveProperty('price', updatedProductData.price);
      expect(response.body.data).toHaveProperty(
        'image_path',
        updatedProductData.image_path,
      );
      expect(response.body.data).toHaveProperty('slug');
    });
  });

  describe('customer', () => {
    it('should not update a product', async () => {
      const userId = await getUserIdByRole('CUSTOMER');
      const token = generateToken(userId);

      const response = await updateProductRequest(product._id, token, updatedProductData);

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('unauthorized user', () => {
    it('should not update a product', async () => {
      const response = await request(app)
        .put(`/api/v1/products/${product._id}`)
        .send(updatedProductData);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('invalid product ID', () => {
    it('should return 404 for non-existent product ID', async () => {
      const userId = await getUserIdByRole('MANAGER');
      const token = generateToken(userId);
      const nonExistentId = '000000000000000000000000';

      const response = await updateProductRequest(
        nonExistentId,
        token,
        updatedProductData,
      );

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
