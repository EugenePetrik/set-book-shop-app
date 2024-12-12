const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { getUserIdByRole } = require('../testData/user');
const {
  createProductWithStore,
  createProductWithoutStore,
} = require('../testData/product');

describe('Product API - DELETE /api/v1/products/:id', () => {
  let app;
  let product;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    ({ product } = await createProductWithStore());
  });

  const deleteProductRequest = async (role, productId) => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);
    return request(app)
      .delete(`/api/v1/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);
  };

  it('should delete a product by ID for manager', async () => {
    const response = await deleteProductRequest('MANAGER', product._id);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should not delete a product for customer', async () => {
    const response = await deleteProductRequest('CUSTOMER', product._id);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it('should not delete a product for unauthorized user', async () => {
    const response = await request(app).delete(`/api/v1/products/${product._id}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should return 404 for non-existent product ID', async () => {
    const nonExistentId = '000000000000000000000000';
    const response = await deleteProductRequest('MANAGER', nonExistentId);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 404 if store item is not found for the given product', async () => {
    const productWithoutStoreItem = await createProductWithoutStore();

    const response = await deleteProductRequest('MANAGER', productWithoutStoreItem._id);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Store item not found for the given product');
  });
});
