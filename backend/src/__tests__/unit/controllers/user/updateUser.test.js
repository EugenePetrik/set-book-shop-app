const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const UserService = require('../../../../services/user');
const { updateUser } = require('../../../../controllers/user');

describe('User Controller - Update User', () => {
  it('should call UserService.updateUser and send a response', async () => {
    const user = { id: new mongoose.Types.ObjectId(), name: faker.person.fullName() };
    const req = { params: { id: user.id }, body: { name: user.name } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    UserService.updateUser = jest.fn().mockResolvedValue(user);
    await updateUser(req, res, next);

    expect(UserService.updateUser).toHaveBeenCalledWith(req.params.id, req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: user });
  });
});
