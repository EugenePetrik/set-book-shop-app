const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const StoreItem = require('../../../../models/StoreItem');

describe('StoreItem Service - Update Store Item', () => {
  let mockStoreItemData;
  let mockStoreItem;
  let mockUpdatedStoreItem;
  let mockStoreItemId;
  let mockPopulate;

  beforeEach(() => {
    mockStoreItemId = new mongoose.Types.ObjectId();
    mockStoreItemData = { available_qty: faker.number.int({ min: 0, max: 100 }) };
    mockStoreItem = {
      _id: mockStoreItemId,
      product: new mongoose.Types.ObjectId(),
      available_qty: faker.number.int({ min: 0, max: 100 }),
    };
    mockUpdatedStoreItem = {
      _id: mockStoreItemId,
      product: new mongoose.Types.ObjectId(),
      available_qty: mockStoreItemData.available_qty,
    };

    mockPopulate = jest.fn().mockImplementation(function () {
      this._id = mockUpdatedStoreItem._id;
      this.product = mockUpdatedStoreItem.product;
      this.available_qty = mockUpdatedStoreItem.available_qty;
      return Promise.resolve(this);
    });

    StoreItem.findById.mockResolvedValue(mockStoreItem);
    StoreItem.findByIdAndUpdate.mockReturnValue(
      Promise.resolve({
        ...mockUpdatedStoreItem,
        populate: mockPopulate,
      }),
    );
  });

  it('should update store item', async () => {
    const result = await StoreItemService.updateStoreItem(
      mockStoreItemId,
      mockStoreItemData,
    );

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockStoreItemId,
        product: mockUpdatedStoreItem.product,
        available_qty: mockUpdatedStoreItem.available_qty,
      }),
    );
    expect(StoreItem.findById).toHaveBeenCalledWith(mockStoreItemId);
    expect(StoreItem.findByIdAndUpdate).toHaveBeenCalledWith(
      mockStoreItemId,
      mockStoreItemData,
      {
        new: true,
        runValidators: true,
      },
    );
    expect(mockPopulate).toHaveBeenCalledWith({
      path: 'product',
      select: '_id name author price',
    });
  });

  it('should throw an error if store item not found', async () => {
    StoreItem.findById.mockResolvedValue(null);

    await expect(
      StoreItemService.updateStoreItem(mockStoreItemId, mockStoreItemData),
    ).rejects.toThrow(`Store item not found with id of ${mockStoreItemId}`);
  });
});
