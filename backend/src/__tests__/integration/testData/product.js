const { faker } = require('@faker-js/faker');
const Product = require('../../../models/Product');
const StoreItem = require('../../../models/StoreItem');

function generateProductData() {
  return {
    name: `${faker.commerce.productName()} ${Date.now()}`,
    description: faker.commerce.productDescription(),
    author: faker.person.fullName(),
    price: faker.number.int({ min: 10, max: 1000 }),
    image_path: faker.image.url(),
  };
}

async function createProductWithoutStore() {
  const productData = generateProductData();
  const product = new Product(productData);
  await product.save();
  return product;
}

async function createProductWithStore() {
  const product = await createProductWithoutStore();

  const storeItemData = {
    product: product._id,
    available_qty: faker.number.int({ min: 30, max: 100 }),
    booked_qty: faker.number.int({ min: 5, max: 10 }),
    sold_qty: faker.number.int({ min: 5, max: 10 }),
  };

  const storeItem = new StoreItem(storeItemData);
  const savedStoreItem = await storeItem.save();

  return { product, storeItem: savedStoreItem };
}

module.exports = {
  generateProductData,
  createProductWithoutStore,
  createProductWithStore,
};
