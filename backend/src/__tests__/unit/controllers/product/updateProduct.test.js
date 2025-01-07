const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ProductService = require('../../../../services/product');
const { updateProduct } = require('../../../../controllers/product');

describe('Product Controller - Update Product', () => {
  it('should call ProductService.updateProduct and send a response', async () => {
    const product = {
      id: new mongoose.Types.ObjectId().toString(),
      name: faker.commerce.productName(),
    };
    const req = { params: { id: product.id }, body: { name: product.name } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    ProductService.updateProduct = jest.fn().mockResolvedValue(product);
    await updateProduct(req, res, next);

    expect(ProductService.updateProduct).toHaveBeenCalledWith(req.params.id, req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: product });
  });
});
