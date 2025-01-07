const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../../../services/auth');
const User = require('../../../../models/User');

describe('Auth Service - Update Details', () => {
  it('should update user details', async () => {
    const mockUserId = new mongoose.Types.ObjectId();
    const mockFieldsToUpdate = { name: faker.person.fullName() };
    const mockUpdatedUser = { ...mockFieldsToUpdate, _id: mockUserId };

    const populateMock = jest.fn().mockResolvedValue({
      ...mockUpdatedUser,
      role: { _id: new mongoose.Types.ObjectId(), name: faker.person.jobTitle() },
    });

    User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUser);
    User.findById = jest.fn().mockImplementation(() => ({
      populate: populateMock,
    }));

    const result = await AuthService.updateDetails(mockUserId, mockFieldsToUpdate);

    expect(result).toEqual({
      ...mockUpdatedUser,
      role: { _id: expect.any(mongoose.Types.ObjectId), name: expect.any(String) },
    });
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockFieldsToUpdate, {
      new: true,
      runValidators: true,
    });
    expect(User.findById).toHaveBeenCalledWith(mockUpdatedUser._id);
    expect(populateMock).toHaveBeenCalledWith({
      path: 'role',
      select: '_id name',
    });
  });

  it('should throw an error if user not found', async () => {
    const mockUserId = new mongoose.Types.ObjectId();
    const mockFieldsToUpdate = { name: faker.person.fullName() };

    User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await expect(
      AuthService.updateDetails(mockUserId, mockFieldsToUpdate),
    ).rejects.toThrow(`User not found with id of ${mockUserId}`);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockFieldsToUpdate, {
      new: true,
      runValidators: true,
    });
  });
});
