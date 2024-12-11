const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../../../models/User');
const UserService = require('../../../../services/user');

describe('User Service - Create User', () => {
  it('should create a new user when all required fields are provided', async () => {
    const mockUserData = {
      name: faker.person.fullName(),
      role: new mongoose.Types.ObjectId(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      login: faker.internet.username(),
      password: faker.internet.password(),
    };
    const mockRole = { _id: new mongoose.Types.ObjectId(), name: faker.lorem.word() };
    const mockUserInstance = {
      _id: new mongoose.Types.ObjectId(),
      ...mockUserData,
      save: jest.fn().mockResolvedValue(undefined),
      populate: jest.fn().mockImplementation(function () {
        this.role = mockRole;
        return this;
      }),
    };

    User.mockImplementation(() => mockUserInstance);

    const result = await UserService.createUser(mockUserData);

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockUserInstance._id,
        name: mockUserData.name,
        role: mockRole,
      }),
    );

    expect(mockUserInstance.save).toHaveBeenCalledTimes(1);
    expect(mockUserInstance.populate).toHaveBeenCalledWith('role', '_id name');
  });

  it('should throw an error if any required field is missing', async () => {
    const requiredFields = [
      'name',
      'role',
      'email',
      'phone',
      'address',
      'login',
      'password',
    ];

    for (const field of requiredFields) {
      const userData = {
        name: faker.person.fullName(),
        role: new mongoose.Types.ObjectId(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        login: faker.internet.username(),
        password: faker.internet.password(),
      };
      delete userData[field];

      await expect(UserService.createUser(userData)).rejects.toThrow(
        `Please provide a ${field}`,
      );
    }
  });
});
