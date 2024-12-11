const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../../../services/auth');
const { getMe } = require('../../../../controllers/auth');

describe('Auth Controller - Get Me', () => {
  it('should call AuthService.getMe and send a response', async () => {
    const user = { id: new mongoose.Types.ObjectId(), name: faker.person.fullName() };
    const req = { user: { id: user.id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    jest.spyOn(AuthService, 'getMe').mockReturnValue(user);

    await getMe(req, res, next);

    expect(AuthService.getMe).toHaveBeenCalledWith(req.user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: user });
  });
});
