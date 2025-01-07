const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const { getRoleById } = require('../../../../controllers/role');

describe('Role Controller - Get Role By ID', () => {
  it('should call RoleService.getRoleById and send a response', async () => {
    const role = { id: new mongoose.Types.ObjectId(), name: 'CUSTOMER' };
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    RoleService.getRoleById = jest.fn().mockResolvedValue(role);
    await getRoleById(req, res, next);

    expect(RoleService.getRoleById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: role });
  });
});
