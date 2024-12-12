const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const Role = require('../../../../models/Role');

describe('Role Service - Delete Role', () => {
  let mockRoleId;
  let mockRole;

  beforeEach(() => {
    mockRoleId = new mongoose.Types.ObjectId();
    mockRole = { _id: mockRoleId, name: 'ADMIN' };

    Role.findById.mockResolvedValue(mockRole);
  });

  it('should delete a role', async () => {
    Role.findByIdAndDelete.mockResolvedValue(mockRole);

    await RoleService.deleteRole(mockRoleId);

    expect(Role.findById).toHaveBeenCalledWith(mockRoleId);
    expect(Role.findByIdAndDelete).toHaveBeenCalledWith(mockRoleId);
  });

  it('should throw error if role not found', async () => {
    Role.findById.mockResolvedValue(null);

    await expect(RoleService.deleteRole(mockRoleId)).rejects.toThrow(
      `Role not found with id of ${mockRoleId}`,
    );
    expect(Role.findById).toHaveBeenCalledWith(mockRoleId);
  });
});
