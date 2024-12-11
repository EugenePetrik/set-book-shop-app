const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const StoreItemService = require('../../../../services/storeItem');
const { getStoreItemById } = require('../../../../controllers/storeItem');

describe('StoreItem Controller - Get Store Item By ID', () => {
  it('should call StoreItemService.getStoreItemById and send a response', async () => {
    const storeItem = {
      id: new mongoose.Types.ObjectId(),
      available_qty: faker.number.int({ min: 1, max: 5 }),
    };
    const req = { params: { id: storeItem.id } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    StoreItemService.getStoreItemById = jest.fn().mockResolvedValue(storeItem);
    await getStoreItemById(req, res, next);

    expect(StoreItemService.getStoreItemById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: storeItem });
  });
});
