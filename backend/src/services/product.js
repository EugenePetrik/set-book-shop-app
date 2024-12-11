const slugify = require('slugify');
const Product = require('../models/Product');
const StoreItem = require('../models/StoreItem');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Get all products.
 *
 * @returns  {Promise<Array>} A list of products.
 */
exports.getProducts = async () => {
  return Product.find();
};

/**
 * Get a specific product by ID.
 *
 * @param    {string} id - The ID of the product.
 * @returns  {Promise<Object>} The product.
 * @throws   {ErrorResponse} If the product is not found.
 */
exports.getProductById = async id => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ErrorResponse(`Product not found with id of ${id}`, 404);
  }

  return product;
};

/**
 * Create a new product.
 *
 * @param    {Object} productData - The data for the new product.
 * @returns  {Promise<Object>} The newly created product.
 * @throws   {ErrorResponse} If required fields are missing.
 */
exports.createProduct = async productData => {
  const requiredFields = ['name', 'description', 'author', 'price', 'image_path'];

  for (const field of requiredFields) {
    if (!productData[field]) {
      throw new ErrorResponse(`Please provide a ${field}`, 400);
    }
  }

  const product = new Product(productData);
  const savedProduct = await product.save();

  const storeItem = new StoreItem({
    product: savedProduct._id,
    available_qty: 0,
    booked_qty: 0,
    sold_qty: 0,
  });

  await storeItem.save();

  return savedProduct;
};

/**
 * Update a product.
 *
 * @param    {string} id - The ID of the product to update.
 * @param    {Object} productData - The data to update the product with.
 * @returns  {Promise<Object>} The updated product.
 * @throws   {ErrorResponse} If the product is not found.
 */
exports.updateProduct = async (id, productData) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ErrorResponse(`Product not found with id of ${id}`, 404);
  }

  // Update slug while updating name
  if (Object.keys(productData).includes('name')) {
    productData.slug = slugify(productData.name, { lower: true });
  }

  return Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete a product.
 *
 * @param    {string} id - The ID of the product to delete.
 * @returns  {Promise<void>}
 * @throws   {ErrorResponse} If the product or associated store item is not found.
 */
exports.deleteProduct = async id => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ErrorResponse(`Product not found with id of ${id}`, 404);
  }

  const storeItem = await StoreItem.findOne({ product: id });

  if (!storeItem) {
    throw new ErrorResponse('Store item not found for the given product', 404);
  }

  await StoreItem.findOneAndDelete({ product: id });
  await Product.findByIdAndDelete(id);
};
