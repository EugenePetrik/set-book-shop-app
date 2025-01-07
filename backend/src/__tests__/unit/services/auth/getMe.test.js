const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../../../services/auth');

describe('Auth Service - Get Me', () => {
  it('should return the user', () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      name: faker.person.fullName(),
    };

    const result = AuthService.getMe(mockUser);

    expect(result).toEqual(mockUser);
  });
});
