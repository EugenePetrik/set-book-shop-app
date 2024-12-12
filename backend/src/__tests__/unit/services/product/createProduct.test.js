const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ProductService = require('../../../../services/product');
const Product = require('../../../../models/Product');
const StoreItem = require('../../../../models/StoreItem');

describe('Product Service - Create Product', () => {
  it('should create a new product', async () => {
    const mockProductData = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      author: faker.person.fullName(),
      image_path: faker.image.url(),
    };
    const mockSavedProduct = {
      _id: new mongoose.Types.ObjectId(),
      ...mockProductData,
    };
    const mockProductInstance = {
      ...mockProductData,
      save: jest.fn().mockResolvedValue(mockSavedProduct),
    };
    Product.mockImplementation(() => mockProductInstance);
    const mockStoreItem = {
      save: jest.fn().mockResolvedValue({}),
    };
    StoreItem.mockImplementation(() => mockStoreItem);

    const result = await ProductService.createProduct(mockProductData);

    expect(result).toEqual(mockSavedProduct);
    expect(Product).toHaveBeenCalledWith(mockProductData);
    expect(mockProductInstance.save).toHaveBeenCalled();
    expect(StoreItem).toHaveBeenCalledWith({
      product: mockSavedProduct._id,
      available_qty: 0,
      booked_qty: 0,
      sold_qty: 0,
    });
    expect(mockStoreItem.save).toHaveBeenCalled();
  });

  it('should throw an error if a required field is missing', async () => {
    const mockProductData = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      author: faker.person.fullName(),
      price: faker.commerce.price(),
      image_path: faker.image.url(),
    };
    const requiredFields = ['name', 'description', 'author', 'price', 'image_path'];

    for (const field of requiredFields) {
      const incompleteProductData = { ...mockProductData };
      delete incompleteProductData[field];

      await expect(ProductService.createProduct(incompleteProductData)).rejects.toThrow(
        `Please provide a ${field}`,
      );
    }
  });

  it('should create a product when all required fields are provided', async () => {
    const mockProductData = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      author: faker.person.fullName(),
      price: faker.commerce.price(),
      image_path: faker.image.url(),
    };
    const mockSavedProduct = {
      _id: new mongoose.Types.ObjectId(),
      ...mockProductData,
    };
    const mockStoreItem = {
      product: mockSavedProduct._id,
      available_qty: 0,
      booked_qty: 0,
      sold_qty: 0,
    };

    Product.prototype.save = jest.fn().mockResolvedValue(mockSavedProduct);
    StoreItem.prototype.save = jest.fn().mockResolvedValue(mockStoreItem);

    const result = await ProductService.createProduct(mockProductData);

    expect(result).toEqual(mockSavedProduct);
    expect(Product.prototype.save).toHaveBeenCalled();
    expect(StoreItem).toHaveBeenCalledWith({
      product: mockSavedProduct._id,
      available_qty: 0,
      booked_qty: 0,
      sold_qty: 0,
    });
    expect(StoreItem.prototype.save).toHaveBeenCalled();
  });
});
