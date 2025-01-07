const mongoose = require('mongoose');
const ProductService = require('../../../../services/product');
const { deleteProduct } = require('../../../../controllers/product');

describe('Product Controller - Delete Product', () => {
  it('should call ProductService.deleteProduct and send a response', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    ProductService.deleteProduct = jest.fn().mockResolvedValue();
    await deleteProduct(req, res, next);

    expect(ProductService.deleteProduct).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });
});
