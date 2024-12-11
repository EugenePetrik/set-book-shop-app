const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const UserService = require('../../../../services/user');
const { getUsers } = require('../../../../controllers/user');

describe('User Controller - Get Users', () => {
  it('should call UserService.getUsers and send a response', async () => {
    const users = Array.from({ length: 2 }, () => ({
      id: new mongoose.Types.ObjectId(),
      name: faker.person.fullName(),
    }));
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    UserService.getUsers = jest.fn().mockResolvedValue(users);
    await getUsers(req, res, next);

    expect(UserService.getUsers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: users });
  });
});
