const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const Role = require('../../../../models/Role');

describe('Role Service - Get Roles', () => {
  it('should retrieve all roles', async () => {
    const mockRoles = [
      { _id: new mongoose.Types.ObjectId(), name: 'ADMIN' },
      { _id: new mongoose.Types.ObjectId(), name: 'MANAGER' },
    ];

    Role.find.mockResolvedValue(mockRoles);

    const result = await RoleService.getRoles();

    expect(result).toEqual(mockRoles);
    expect(Role.find).toHaveBeenCalled();
  });
});
