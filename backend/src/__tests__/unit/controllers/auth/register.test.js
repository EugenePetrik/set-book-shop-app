const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../../../services/auth');
const { register } = require('../../../../controllers/auth');

describe('Auth Controller - Register', () => {
  let fakeUser;
  let req;
  let res;
  let next;

  beforeEach(() => {
    fakeUser = {
      id: new mongoose.Types.ObjectId(),
      name: faker.person.fullName(),
      getSignedJwtToken: jest.fn().mockReturnValue(faker.string.uuid()),
    };
    req = {
      body: {
        name: fakeUser.name,
        password: faker.internet.password(),
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.spyOn(AuthService, 'register').mockResolvedValue(fakeUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.NODE_ENV;
  });

  it('should call AuthService.register and send a token response', async () => {
    await register(req, res, next);

    expect(AuthService.register).toHaveBeenCalledWith(req.body);
    expect(fakeUser.getSignedJwtToken).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      fakeUser.getSignedJwtToken(),
      expect.any(Object),
    );
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      token: fakeUser.getSignedJwtToken(),
    });
  });

  it('should set secure option to true if NODE_ENV is production', async () => {
    process.env.NODE_ENV = 'production';

    await register(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      fakeUser.getSignedJwtToken(),
      expect.objectContaining({ secure: true }),
    );
  });

  it('should not set secure option if NODE_ENV is not production', async () => {
    process.env.NODE_ENV = 'development';

    await register(req, res, next);

    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      fakeUser.getSignedJwtToken(),
      expect.not.objectContaining({ secure: true }),
    );
  });
});
