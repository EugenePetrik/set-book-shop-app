const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const { createStoreItem } = require('../../../../controllers/storeItem');

describe('StoreItem Controller - Create Store Item', () => {
  it('should call StoreItemService.createStoreItem and send a response', async () => {
    const storeItem = {
      id: new mongoose.Types.ObjectId(),
      available_qty: faker.number.int({ min: 1, max: 5 }),
    };
    const req = { body: { available_qty: storeItem.available_qty } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    StoreItemService.createStoreItem = jest.fn().mockResolvedValue(storeItem);
    await createStoreItem(req, res, next);

    expect(StoreItemService.createStoreItem).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: storeItem });
  });
});
