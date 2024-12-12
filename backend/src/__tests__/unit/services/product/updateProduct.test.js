const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const slugify = require('slugify');
const ProductService = require('../../../../services/product');
const Product = require('../../../../models/Product');

describe('Product Service - Update Product', () => {
  let mockProductId;
  let mockProduct;
  let updatedPrice;
  let updatedName;
  let updatedSlug;

  beforeEach(() => {
    mockProductId = new mongoose.Types.ObjectId();
    mockProduct = {
      _id: mockProductId,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
    };
    updatedPrice = faker.commerce.price();
    updatedName = faker.commerce.productName();
    updatedSlug = slugify(updatedName, { lower: true });

    Product.findById = jest.fn().mockResolvedValue(mockProduct);
  });

  it('should update a product', async () => {
    Product.findByIdAndUpdate = jest.fn().mockResolvedValue({
      ...mockProduct,
      price: updatedPrice,
    });

    const result = await ProductService.updateProduct(mockProductId, {
      price: updatedPrice,
    });

    expect(result).toEqual({ ...mockProduct, price: updatedPrice });
    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      mockProductId,
      { price: updatedPrice },
      { new: true, runValidators: true },
    );
  });

  it('should update the product slug when the name is changed', async () => {
    Product.findByIdAndUpdate = jest.fn().mockResolvedValue({
      ...mockProduct,
      name: updatedName,
      slug: updatedSlug,
    });

    const result = await ProductService.updateProduct(mockProductId, {
      name: updatedName,
    });

    expect(result).toEqual({ ...mockProduct, name: updatedName, slug: updatedSlug });
    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      mockProductId,
      { name: updatedName, slug: updatedSlug },
      { new: true, runValidators: true },
    );
  });

  it('should throw an error if product not found', async () => {
    Product.findById = jest.fn().mockResolvedValue(null);

    await expect(
      ProductService.updateProduct(mockProductId, { price: updatedPrice }),
    ).rejects.toThrow(`Product not found with id of ${mockProductId}`);

    expect(Product.findById).toHaveBeenCalledWith(mockProductId);
  });
});
