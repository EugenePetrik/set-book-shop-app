const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../../../services/auth');
const { updateDetails } = require('../../../../controllers/auth');

describe('Auth Controller - Update Details', () => {
  it('should call AuthService.updateDetails and send a response', async () => {
    const fakeUser = {
      id: new mongoose.Types.ObjectId(),
      name: faker.person.fullName(),
    };
    const fieldsToUpdate = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      login: faker.internet.username(),
    };
    const updatedUser = {
      ...fakeUser,
      ...fieldsToUpdate,
    };
    const req = { user: { id: fakeUser.id }, body: fieldsToUpdate };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    AuthService.updateDetails = jest.fn().mockResolvedValue(updatedUser);
    await updateDetails(req, res, next);

    expect(AuthService.updateDetails).toHaveBeenCalledWith(req.user.id, fieldsToUpdate);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: updatedUser });
  });
});
