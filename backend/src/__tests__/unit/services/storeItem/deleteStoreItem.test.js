const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const StoreItem = require('../../../../models/StoreItem');

describe('StoreItem Service - Delete Store Item', () => {
  let mockStoreItem;
  let mockStoreItemId;

  beforeEach(() => {
    mockStoreItemId = new mongoose.Types.ObjectId();
    mockStoreItem = {
      _id: mockStoreItemId,
      product: new mongoose.Types.ObjectId(),
      available_qty: faker.number.int({ min: 0, max: 100 }),
    };

    StoreItem.findById.mockResolvedValue(mockStoreItem);
  });

  it('should delete store item', async () => {
    StoreItem.findByIdAndDelete.mockResolvedValue(mockStoreItem);

    await StoreItemService.deleteStoreItem(mockStoreItemId);

    expect(StoreItem.findById).toHaveBeenCalledWith(mockStoreItemId);
    expect(StoreItem.findByIdAndDelete).toHaveBeenCalledWith(mockStoreItemId);
  });

  it('should throw an error if store item not found', async () => {
    StoreItem.findById.mockResolvedValue(null);

    await expect(StoreItemService.deleteStoreItem(mockStoreItemId)).rejects.toThrow(
      `Store item not found with id of ${mockStoreItemId}`,
    );

    expect(StoreItem.findById).toHaveBeenCalledWith(mockStoreItemId);
    expect(StoreItem.findByIdAndDelete).not.toHaveBeenCalled();
  });
});
