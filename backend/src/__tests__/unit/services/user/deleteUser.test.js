const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../../../models/User');
const UserService = require('../../../../services/user');

describe('User Service - Delete User', () => {
  let mockUserId;
  let mockUser;

  beforeEach(() => {
    mockUserId = new mongoose.Types.ObjectId();
    mockUser = { _id: mockUserId, name: faker.person.fullName() };

    User.findById.mockResolvedValue(mockUser);
  });

  it('should delete user', async () => {
    User.findByIdAndDelete.mockResolvedValue(mockUser);

    const result = await UserService.deleteUser(mockUserId);

    expect(result).toBeUndefined();
    expect(User.findById).toHaveBeenCalledWith(mockUserId);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUserId);
  });

  it('should throw an error if user not found', async () => {
    User.findById.mockResolvedValue(null);

    await expect(UserService.deleteUser(mockUserId)).rejects.toThrow(
      `User not found with id of ${mockUserId}`,
    );

    expect(User.findById).toHaveBeenCalledWith(mockUserId);
  });
});
