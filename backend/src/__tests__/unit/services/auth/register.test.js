const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../../../services/auth');
const User = require('../../../../models/User');

describe('Auth Service - Register', () => {
  it('should register a new user', async () => {
    const mockUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: new mongoose.Types.ObjectId(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      login: faker.internet.username(),
    };

    const mockSavedUser = {
      ...mockUserData,
      _id: new mongoose.Types.ObjectId(),
    };

    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockSavedUser),
    }));

    const result = await AuthService.register(mockUserData);

    expect(result).toEqual(mockSavedUser);
    expect(User).toHaveBeenCalledWith(mockUserData);
  });
});
