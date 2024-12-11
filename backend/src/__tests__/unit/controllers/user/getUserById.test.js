const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const UserService = require('../../../../services/user');
const { getUserById } = require('../../../../controllers/user');

describe('User Controller - Get User By ID', () => {
  it('should call UserService.getUserById and send a response', async () => {
    const user = { id: new mongoose.Types.ObjectId(), name: faker.person.fullName() };
    const req = { params: { id: user.id } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    UserService.getUserById = jest.fn().mockResolvedValue(user);
    await getUserById(req, res, next);

    expect(UserService.getUserById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: user });
  });
});
