const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const Role = require('../../../../models/Role');

describe('Role Service - Get Role By ID', () => {
  let mockRoleId;
  let mockRole;

  beforeEach(() => {
    mockRoleId = new mongoose.Types.ObjectId();
    mockRole = { _id: mockRoleId, name: 'ADMIN' };

    Role.findById.mockResolvedValue(mockRole);
  });

  it('should retrieve role by ID', async () => {
    const result = await RoleService.getRoleById(mockRoleId);

    expect(result).toEqual(mockRole);
    expect(Role.findById).toHaveBeenCalledWith(mockRoleId);
  });

  it('should throw error if role not found', async () => {
    Role.findById.mockResolvedValue(null);

    await expect(RoleService.getRoleById(mockRoleId)).rejects.toThrow(
      `Role not found with id of ${mockRoleId}`,
    );
    expect(Role.findById).toHaveBeenCalledWith(mockRoleId);
  });
});
