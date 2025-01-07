const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ProductService = require('../../../../services/product');
const { getProducts } = require('../../../../controllers/product');

describe('Product Controller - Get Products', () => {
  it('should call ProductService.getProducts and send a response', async () => {
    const products = Array.from({ length: 3 }, () => ({
      id: new mongoose.Types.ObjectId().toString(),
      name: faker.commerce.productName(),
    }));
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    ProductService.getProducts = jest.fn().mockResolvedValue(products);
    await getProducts(req, res, next);

    expect(ProductService.getProducts).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: products });
  });
});
