const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const { updateStoreItem } = require('../../../../controllers/storeItem');

describe('StoreItem Controller - Update Store Item', () => {
  it('should call StoreItemService.updateStoreItem and send a response', async () => {
    const storeItem = {
      id: new mongoose.Types.ObjectId(),
      available_qty: faker.number.int({ min: 1, max: 5 }),
    };
    const req = {
      params: { id: storeItem.id },
      body: { available_qty: storeItem.available_qty },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    StoreItemService.updateStoreItem = jest.fn().mockResolvedValue(storeItem);
    await updateStoreItem(req, res, next);

    expect(StoreItemService.updateStoreItem).toHaveBeenCalledWith(
      req.params.id,
      req.body,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: storeItem });
  });
});
