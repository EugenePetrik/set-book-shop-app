const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const { getStoreItems } = require('../../../../controllers/storeItem');

describe('StoreItem Controller - Get Roles', () => {
  it('should call StoreItemService.getStoreItems and send a response', async () => {
    const storeItems = Array.from({ length: 5 }, () => ({
      id: new mongoose.Types.ObjectId(),
      available_qty: faker.number.int({ min: 1, max: 5 }),
    }));
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    StoreItemService.getStoreItems = jest.fn().mockResolvedValue(storeItems);
    await getStoreItems(req, res, next);

    expect(StoreItemService.getStoreItems).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: storeItems });
  });
});
