const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const { getRoles } = require('../../../../controllers/role');

describe('Role Controller - Get Roles', () => {
  it('should call RoleService.getRoles and send a response', async () => {
    const roles = [
      { id: new mongoose.Types.ObjectId(), name: 'ADMIN' },
      { id: new mongoose.Types.ObjectId(), name: 'MANAGER' },
    ];
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    RoleService.getRoles = jest.fn().mockResolvedValue(roles);
    await getRoles(req, res, next);

    expect(RoleService.getRoles).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: roles });
  });
});
