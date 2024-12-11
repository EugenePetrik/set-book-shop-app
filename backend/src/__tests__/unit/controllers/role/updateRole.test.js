const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const { updateRole } = require('../../../../controllers/role');

describe('Role Controller - Update Role', () => {
  it('should call RoleService.updateRole and send a response', async () => {
    const role = { id: new mongoose.Types.ObjectId(), name: 'ADMIN' };
    const req = { params: { id: role.id }, body: { name: role.name } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    RoleService.updateRole = jest.fn().mockResolvedValue(role);
    await updateRole(req, res, next);

    expect(RoleService.updateRole).toHaveBeenCalledWith(req.params.id, req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: role });
  });
});
