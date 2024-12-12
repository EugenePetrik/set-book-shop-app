const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const { deleteRole } = require('../../../../controllers/role');

describe('Role Controller - Delete Role', () => {
  it('should call RoleService.deleteRole and send a response', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    RoleService.deleteRole = jest.fn().mockResolvedValue();
    await deleteRole(req, res, next);

    expect(RoleService.deleteRole).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });
});
