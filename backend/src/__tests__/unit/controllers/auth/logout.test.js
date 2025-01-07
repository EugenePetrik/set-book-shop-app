const AuthService = require('../../../../services/auth');
const { logout } = require('../../../../controllers/auth');

describe('Auth Controller - Logout', () => {
  it('should call AuthService.logout and send a response', async () => {
    const req = {};
    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const logoutResult = { token: '', options: {} };
    jest.spyOn(AuthService, 'logout').mockReturnValue(logoutResult);

    await logout(req, res, next);

    expect(AuthService.logout).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith('token', '', logoutResult.options);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });
});
