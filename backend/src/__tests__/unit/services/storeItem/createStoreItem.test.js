const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const StoreItem = require('../../../../models/StoreItem');

describe('StoreItem Service - Create Store Item', () => {
  it('should create a new store item when all required fields are provided', async () => {
    const mockStoreItemData = {
      product: new mongoose.Types.ObjectId(),
      available_qty: faker.number.int({ min: 50, max: 100 }),
      booked_qty: faker.number.int({ min: 5, max: 10 }),
      sold_qty: faker.number.int({ min: 5, max: 10 }),
    };

    const mockStoreItem = {
      _id: new mongoose.Types.ObjectId(),
      ...mockStoreItemData,
    };

    const mockStoreItemInstance = {
      ...mockStoreItem,
      save: jest.fn().mockResolvedValue(mockStoreItem),
      populate: jest.fn().mockImplementation(function () {
        return Promise.resolve(this);
      }),
    };

    StoreItem.mockImplementation(() => mockStoreItemInstance);

    const result = await StoreItemService.createStoreItem(mockStoreItemData);

    expect(result).toEqual(expect.objectContaining(mockStoreItem));
    expect(mockStoreItemInstance.save).toHaveBeenCalledTimes(1);
    expect(mockStoreItemInstance.populate).toHaveBeenCalledWith({
      path: 'product',
      select: '_id name author price',
    });
  });

  it('should throw an error if any required field is missing', async () => {
    const requiredFields = ['product', 'available_qty', 'booked_qty', 'sold_qty'];
    for (const field of requiredFields) {
      const storeItemData = {
        product: new mongoose.Types.ObjectId(),
        available_qty: faker.number.int({ min: 10, max: 100 }),
        booked_qty: faker.number.int({ min: 0, max: 10 }),
        sold_qty: faker.number.int({ min: 0, max: 10 }),
      };
      delete storeItemData[field];

      await expect(StoreItemService.createStoreItem(storeItemData)).rejects.toThrow(
        `Please provide a ${field}`,
      );
    }
  });
});
