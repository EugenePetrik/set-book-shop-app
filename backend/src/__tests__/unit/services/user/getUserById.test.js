const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../../../models/User');
const UserService = require('../../../../services/user');

describe('User Service - Get User By ID', () => {
  let mockUserId;
  let mockUser;

  beforeEach(() => {
    mockUserId = new mongoose.Types.ObjectId();
    mockUser = {
      _id: mockUserId,
      name: faker.person.fullName(),
      role: { _id: new mongoose.Types.ObjectId(), name: 'ADMIN' },
    };

    User.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockUser),
    });
  });

  it('should get user by id', async () => {
    const result = await UserService.getUserById(mockUserId);

    expect(result).toEqual(mockUser);
    expect(User.findById).toHaveBeenCalledWith(mockUserId);
    expect(User.findById().populate).toHaveBeenCalledWith({
      path: 'role',
      select: '_id name',
    });
  });

  it('should throw an error if user not found', async () => {
    User.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    await expect(UserService.getUserById(mockUserId)).rejects.toThrow(
      `User not found with id of ${mockUserId}`,
    );
  });
});
