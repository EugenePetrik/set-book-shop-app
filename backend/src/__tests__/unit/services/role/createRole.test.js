const mongoose = require('mongoose');
const RoleService = require('../../../../services/role');
const Role = require('../../../../models/Role');

describe('Role Service - Create Role', () => {
  it('should create a new role', async () => {
    const mockRoleData = { name: 'CUSTOMER' };
    const mockSavedRole = { _id: new mongoose.Types.ObjectId(), ...mockRoleData };
    const mockRoleInstance = {
      ...mockRoleData,
      save: jest.fn().mockResolvedValue(mockSavedRole),
    };

    Role.mockImplementation(() => mockRoleInstance);

    const result = await RoleService.createRole(mockRoleData);

    expect(result).toEqual(mockSavedRole);
    expect(Role).toHaveBeenCalledWith(mockRoleData);
    expect(mockRoleInstance.save).toHaveBeenCalled();
  });
});
