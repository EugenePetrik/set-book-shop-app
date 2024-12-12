const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ProductService = require('../../../../services/product');
const Product = require('../../../../models/Product');
const StoreItem = require('../../../../models/StoreItem');

describe('Product Service - Delete Product', () => {
  let mockProductId;
  let mockStoreItemId;
  let mockProduct;
  let mockStoreItem;

  beforeEach(() => {
    mockProductId = new mongoose.Types.ObjectId();
    mockStoreItemId = new mongoose.Types.ObjectId();
    mockProduct = {
      _id: mockProductId,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
    };
    mockStoreItem = { product: mockStoreItemId };

    Product.findById = jest.fn().mockResolvedValue(mockProduct);
    StoreItem.findOne = jest.fn().mockResolvedValue(mockStoreItem);
    StoreItem.findOneAndDelete = jest.fn().mockResolvedValue(mockStoreItem);
    Product.findByIdAndDelete = jest.fn().mockResolvedValue(mockProduct);
  });

  it('should delete a product', async () => {
    await ProductService.deleteProduct(mockProductId);

    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
    expect(StoreItem.findOne).toHaveBeenCalledWith({ product: mockProductId });
    expect(StoreItem.findOneAndDelete).toHaveBeenCalledWith({ product: mockProductId });
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(mockProductId);
  });

  it('should throw an error if product not found', async () => {
    Product.findById.mockResolvedValue(null);

    await expect(ProductService.deleteProduct(mockProductId)).rejects.toThrow(
      `Product not found with id of ${mockProductId}`,
    );

    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
  });

  it('should throw an error if store item not found', async () => {
    StoreItem.findOne.mockResolvedValue(null);

    await expect(ProductService.deleteProduct(mockProductId)).rejects.toThrow(
      'Store item not found for the given product',
    );

    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
    expect(StoreItem.findOne).toHaveBeenCalledWith({ product: mockProductId });
  });
});
