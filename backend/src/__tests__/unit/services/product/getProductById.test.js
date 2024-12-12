const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ProductService = require('../../../../services/product');
const Product = require('../../../../models/Product');

describe('Product Service - Get Product By ID', () => {
  let mockProductId;
  let mockProduct;

  beforeEach(() => {
    mockProductId = new mongoose.Types.ObjectId();
    mockProduct = { name: faker.commerce.productName(), price: faker.commerce.price() };

    Product.findById = jest.fn();
  });

  it('should get a product by id', async () => {
    Product.findById.mockResolvedValue(mockProduct);

    const result = await ProductService.getProductById(mockProductId);

    expect(result).toEqual(mockProduct);
    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
  });

  it('should throw an error if product not found', async () => {
    Product.findById.mockResolvedValue(null);

    await expect(ProductService.getProductById(mockProductId)).rejects.toThrow(
      `Product not found with id of ${mockProductId}`,
    );

    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
  });
});
