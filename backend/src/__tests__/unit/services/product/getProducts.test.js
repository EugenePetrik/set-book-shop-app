const { faker } = require('@faker-js/faker');
const ProductService = require('../../../../services/product');
const Product = require('../../../../models/Product');

describe('Product Service - Get Products', () => {
  it('should get all products', async () => {
    const mockProducts = [
      { name: faker.commerce.productName(), price: faker.commerce.price() },
      { name: faker.commerce.productName(), price: faker.commerce.price() },
    ];

    Product.find = jest.fn().mockResolvedValue(mockProducts);

    const result = await ProductService.getProducts();

    expect(result).toEqual(mockProducts);
    expect(Product.find).toHaveBeenCalled();
  });
});
