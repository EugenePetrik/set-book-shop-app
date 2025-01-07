const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const Role = require('../../../../models/Role');

describe('Role Service - Update Role', () => {
  let mockRoleId;
  let mockRoleData;
  let mockUpdatedRole;

  beforeEach(() => {
    mockRoleId = new mongoose.Types.ObjectId();
    mockRoleData = { name: 'UPDATED_ROLE' };
    mockUpdatedRole = { _id: mockRoleId, ...mockRoleData };

    Role.findById.mockResolvedValue(mockUpdatedRole);
  });

  it('should update a role', async () => {
    Role.findByIdAndUpdate.mockResolvedValue(mockUpdatedRole);

    const result = await RoleService.updateRole(mockRoleId, mockRoleData);

    expect(result).toEqual(mockUpdatedRole);
    expect(Role.findById).toHaveBeenCalledWith(mockRoleId);
    expect(Role.findByIdAndUpdate).toHaveBeenCalledWith(mockRoleId, mockRoleData, {
      new: true,
      runValidators: true,
    });
  });

  it('should throw error if role not found', async () => {
    Role.findById.mockResolvedValue(null);

    await expect(RoleService.updateRole(mockRoleId, mockRoleData)).rejects.toThrow(
      `Role not found with id of ${mockRoleId}`,
    );
    expect(Role.findById).toHaveBeenCalledWith(mockRoleId);
  });
});
