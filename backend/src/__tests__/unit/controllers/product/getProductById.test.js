const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ProductService = require('../../../../services/product');
const { getProductById } = require('../../../../controllers/product');

describe('Product Controller - Get Product By ID', () => {
  it('should call ProductService.getProductById and send a response', async () => {
    const product = {
      id: new mongoose.Types.ObjectId().toString(),
      name: faker.commerce.productName(),
    };
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    ProductService.getProductById = jest.fn().mockResolvedValue(product);
    await getProductById(req, res, next);

    expect(ProductService.getProductById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: product });
  });
});
