const AuthService = require('../../../../services/auth');

describe('Auth Service - Logout', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2024-06-07T13:02:25.466Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should logout a user', () => {
    const result = AuthService.logout();

    expect(result).toEqual({
      token: 'none',
      options: {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      },
    });
  });
});
