const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const StoreItem = require('../../../../models/StoreItem');

describe('StoreItem Service - Get Store Item By ID', () => {
  let mockStoreItem;
  let mockStoreItemId;
  let mockReturnObject;

  beforeEach(() => {
    mockStoreItemId = new mongoose.Types.ObjectId();
    mockStoreItem = {
      _id: mockStoreItemId,
      product: new mongoose.Types.ObjectId(),
      available_qty: faker.number.int({ min: 0, max: 100 }),
    };
    mockReturnObject = {
      populate: jest.fn().mockResolvedValue(mockStoreItem),
    };

    StoreItem.findById.mockResolvedValue(mockReturnObject);
  });

  it('should get store item by id', async () => {
    const result = await StoreItemService.getStoreItemById(mockStoreItemId);

    expect(result).toEqual(mockStoreItem);
    expect(StoreItem.findById).toHaveBeenCalledWith(mockStoreItemId);
    expect(mockReturnObject.populate).toHaveBeenCalledWith({
      path: 'product',
      select: '_id name author price',
    });
  });

  it('should throw an error if store item not found', async () => {
    StoreItem.findById.mockResolvedValue(null);

    await expect(StoreItemService.getStoreItemById(mockStoreItemId)).rejects.toThrow(
      `Store item not found with id of ${mockStoreItemId}`,
    );
  });
});
