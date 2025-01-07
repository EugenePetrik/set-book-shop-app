const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const { createRole } = require('../../../../controllers/role');

describe('Role Controller - Create Role', () => {
  it('should call RoleService.createRole and send a response', async () => {
    const role = { id: new mongoose.Types.ObjectId().toString(), name: 'MANAGER' };
    const req = { body: { name: role.name } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    RoleService.createRole = jest.fn().mockResolvedValue(role);
    await createRole(req, res, next);

    expect(RoleService.createRole).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: role });
  });
});
