const mongoose = require('mongoose');
const StoreItemService = require('../../../../services/storeItem');
const { deleteStoreItem } = require('../../../../controllers/storeItem');

describe('StoreItem Controller - Delete Store Item', () => {
  it('should call StoreItemService.deleteStoreItem and send a response', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId() } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    StoreItemService.deleteStoreItem = jest.fn().mockResolvedValue();
    await deleteStoreItem(req, res, next);

    expect(StoreItemService.deleteStoreItem).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });
});
