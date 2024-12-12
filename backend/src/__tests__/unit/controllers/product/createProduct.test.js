const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ProductService = require('../../../../services/product');
const { createProduct } = require('../../../../controllers/product');

describe('Product Controller - Create Product', () => {
  it('should call ProductService.createProduct and send a response', async () => {
    const product = {
      id: new mongoose.Types.ObjectId(),
      name: faker.commerce.productName(),
    };
    const req = { body: { name: product.name } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    ProductService.createProduct = jest.fn().mockResolvedValue(product);
    await createProduct(req, res, next);

    expect(ProductService.createProduct).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: product });
  });
});
