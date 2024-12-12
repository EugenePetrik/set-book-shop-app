const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const StoreItem = require('../../../../models/StoreItem');

describe('StoreItem Service - Get Store Items', () => {
  it('should get all store items', async () => {
    const mockStoreItems = [
      {
        _id: new mongoose.Types.ObjectId(),
        product: new mongoose.Types.ObjectId(),
        available_qty: faker.number.int({ min: 0, max: 100 }),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        product: new mongoose.Types.ObjectId(),
        available_qty: faker.number.int({ min: 0, max: 100 }),
      },
    ];

    StoreItem.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockStoreItems),
    });

    const result = await StoreItemService.getStoreItems();

    expect(result).toEqual(mockStoreItems);
    expect(StoreItem.find).toHaveBeenCalledWith();
    expect(StoreItem.find().populate).toHaveBeenCalledWith({
      path: 'product',
      select: '_id name author price',
    });
  });
});
