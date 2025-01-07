const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../../../services/auth');
const { login } = require('../../../../controllers/auth');

describe('Auth Controller - Login', () => {
  it('should call AuthService.login and send a token response', async () => {
    const user = {
      id: new mongoose.Types.ObjectId(),
      name: faker.person.fullName(),
      getSignedJwtToken: jest.fn().mockReturnValue('token'),
    };
    const req = {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    jest.spyOn(AuthService, 'login').mockResolvedValue(user);

    await login(req, res, next);

    expect(AuthService.login).toHaveBeenCalledWith(req.body.email, req.body.password);
    expect(user.getSignedJwtToken).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.cookie).toHaveBeenCalledWith('token', 'token', expect.any(Object));
    expect(res.json).toHaveBeenCalledWith({ success: true, token: 'token' });
  });
});
