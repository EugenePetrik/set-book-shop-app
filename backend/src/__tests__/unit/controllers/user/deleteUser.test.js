const mongoose = require('mongoose');
const UserService = require('../../../../services/user');
const { deleteUser } = require('../../../../controllers/user');

describe('User Controller - Delete User', () => {
  it('should call UserService.deleteUser and send a response', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId() } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    UserService.deleteUser = jest.fn().mockResolvedValue();
    await deleteUser(req, res, next);

    expect(UserService.deleteUser).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });
});
