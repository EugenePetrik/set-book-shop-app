const StoreItem = require('../models/StoreItem');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Get all store items.
 * @returns  {Promise<Array>} - Array of store items with populated product details.
 */
exports.getStoreItems = async () => {
  return StoreItem.find().populate({
    path: 'product',
    select: '_id name author price',
  });
};

/**
 * Get a store item by ID.
 * @param    {string} id - The ID of the store item.
 * @returns  {Promise<Object>} - The store item object with populated product details.
 * @throws   {ErrorResponse} - Throws error if the store item is not found.
 */
exports.getStoreItemById = async id => {
  const storeItem = await StoreItem.findById(id);

  if (!storeItem) {
    throw new ErrorResponse(`Store item not found with id of ${id}`, 404);
  }

  return storeItem.populate({
    path: 'product',
    select: '_id name author price',
  });
};

/**
 * Create a new store item.
 * @param    {Object} storeItemData - The data for the new store item.
 * @returns  {Promise<Object>} - The created store item object with populated product details.
 * @throws   {ErrorResponse} - Throws error if required fields are missing.
 */
exports.createStoreItem = async storeItemData => {
  const requiredFields = ['product', 'available_qty', 'booked_qty', 'sold_qty'];

  for (const field of requiredFields) {
    if (!storeItemData[field]) {
      throw new ErrorResponse(`Please provide a ${field}`, 400);
    }
  }

  const storeItem = new StoreItem(storeItemData);
  await storeItem.save();
  await storeItem.populate({
    path: 'product',
    select: '_id name author price',
  });
  return storeItem;
};

/**
 * Update a store item by ID.
 * @param    {string} id - The ID of the store item to update.
 * @param    {Object} storeItemData - The new data for the store item.
 * @returns  {Promise<Object>} - The updated store item object with populated product details.
 * @throws   {ErrorResponse} - Throws error if the store item is not found.
 */
exports.updateStoreItem = async (id, storeItemData) => {
  const storeItem = await StoreItem.findById(id);

  if (!storeItem) {
    throw new ErrorResponse(`Store item not found with id of ${id}`, 404);
  }

  const updatedStoreItem = await StoreItem.findByIdAndUpdate(id, storeItemData, {
    new: true,
    runValidators: true,
  });

  await updatedStoreItem.populate({
    path: 'product',
    select: '_id name author price',
  });

  return updatedStoreItem;
};

/**
 * Delete a store item by ID.
 * @param   {string} id - The ID of the store item to delete.
 * @throws  {ErrorResponse} - Throws error if the store item is not found.
 */
exports.deleteStoreItem = async id => {
  const storeItem = await StoreItem.findById(id);

  if (!storeItem) {
    throw new ErrorResponse(`Store item not found with id of ${id}`, 404);
  }

  await StoreItem.findByIdAndDelete(id);
};
