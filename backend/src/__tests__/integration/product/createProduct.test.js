const request = require('supertest');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { getUserIdByRole } = require('../testData/user');
const { generateProductData } = require('../testData/product');

describe('Product API - POST /api/v1/products', () => {
  let app;
  let productData;

  beforeAll(async () => {
    app = createApp();
    productData = generateProductData();
  });

  const createProductRequest = async (role, product) => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);

    return request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${token}`)
      .send(product);
  };

  it('should create a new product for manager', async () => {
    const response = await createProductRequest('MANAGER', productData);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      name: productData.name,
      description: productData.description,
      author: productData.author,
      price: productData.price,
      image_path: productData.image_path,
    });
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('slug');
  });

  it('should not create a new product for admin', async () => {
    const response = await createProductRequest('ADMIN', productData);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it('should not create a new product for customer', async () => {
    const response = await createProductRequest('CUSTOMER', productData);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it('should not create a new product for unauthorized user', async () => {
    const response = await request(app).post('/api/v1/products').send(productData);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await createProductRequest('MANAGER', {});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
