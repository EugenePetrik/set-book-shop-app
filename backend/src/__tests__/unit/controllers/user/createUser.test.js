const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const UserService = require('../../../../services/user');
const { createUser } = require('../../../../controllers/user');

describe('User Controller - Create User', () => {
  it('should call UserService.createUser and send a response', async () => {
    const user = { id: new mongoose.Types.ObjectId(), name: faker.person.fullName() };
    const req = { body: { name: user.name } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    UserService.createUser = jest.fn().mockResolvedValue(user);
    await createUser(req, res, next);

    expect(UserService.createUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: user });
  });
});
