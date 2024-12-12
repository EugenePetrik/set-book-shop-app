const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../../../models/User');
const UserService = require('../../../../services/user');

describe('User Service - Update User', () => {
  let mockUserId;
  let mockUserData;
  let mockRole;
  let mockUserInstance;
  let mockUpdatedUserInstance;

  beforeEach(() => {
    mockUserId = new mongoose.Types.ObjectId();
    mockUserData = {
      name: faker.person.fullName(),
      role: new mongoose.Types.ObjectId(),
    };
    mockRole = { _id: new mongoose.Types.ObjectId(), name: faker.lorem.word() };
    mockUserInstance = createMockUserInstance(
      {
        _id: new mongoose.Types.ObjectId(),
        name: faker.person.fullName(),
        role: new mongoose.Types.ObjectId(),
      },
      mockRole,
    );
    mockUpdatedUserInstance = createMockUserInstance(
      {
        _id: mockUserInstance._id,
        name: mockUserData.name,
        role: mockUserData.role,
      },
      mockRole,
    );

    User.findById = jest.fn().mockResolvedValue(mockUserInstance);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUserInstance);
  });

  it('should update user', async () => {
    const result = await UserService.updateUser(mockUserId, mockUserData);

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockUserInstance._id,
        name: mockUserData.name,
        role: mockRole,
      }),
    );

    expect(User.findById).toHaveBeenCalledWith(mockUserId);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockUserData, {
      new: true,
      runValidators: true,
    });
    expect(mockUpdatedUserInstance.populate).toHaveBeenCalledWith({
      path: 'role',
      select: '_id name',
    });
  });

  it('should throw an error if user not found', async () => {
    User.findById.mockResolvedValue(null);

    await expect(UserService.updateUser(mockUserId, {})).rejects.toThrow(
      `User not found with id of ${mockUserId}`,
    );
  });
});

function createMockUserInstance(userData, mockRole) {
  return {
    ...userData,
    save: jest.fn(),
    populate: jest.fn().mockImplementation(function (opts, callback) {
      this.role = mockRole;
      if (callback) callback(null, this);
      return Promise.resolve(this);
    }),
  };
}
