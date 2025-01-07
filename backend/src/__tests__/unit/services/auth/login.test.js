const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../../../services/auth');
const User = require('../../../../models/User');

describe('Auth Service - Login', () => {
  it('should login a user with valid credentials', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
      matchPassword: jest.fn().mockResolvedValue(true),
    };

    User.findOne = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await AuthService.login(email, password);

    expect(result).toEqual(mockUser);
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(mockUser.matchPassword).toHaveBeenCalledWith(password);
  });

  it('should throw an error if email or password is missing', async () => {
    await expect(AuthService.login(null, faker.internet.password())).rejects.toThrow(
      'Please provide an email and password',
    );
    await expect(AuthService.login(faker.internet.email(), null)).rejects.toThrow(
      'Please provide an email and password',
    );
  });

  it('should throw an error if user is not found', async () => {
    User.findOne = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await expect(
      AuthService.login(faker.internet.email(), faker.internet.password()),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw an error if password does not match', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
      matchPassword: jest.fn().mockResolvedValue(false),
    };

    User.findOne = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    await expect(AuthService.login(email, password)).rejects.toThrow(
      'Invalid credentials',
    );
  });
});
