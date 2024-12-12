const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../../../models/User');
const UserService = require('../../../../services/user');

describe('User Service - Get Users', () => {
  it('should get all users', async () => {
    const mockUsers = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: faker.person.fullName(),
        role: { _id: new mongoose.Types.ObjectId(), name: 'ADMIN' },
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: faker.person.fullName(),
        role: { _id: new mongoose.Types.ObjectId(), name: 'CUSTOMER' },
      },
    ];

    const mockQuery = {
      populate: jest.fn().mockResolvedValue(mockUsers),
    };
    User.find.mockReturnValue(mockQuery);

    const result = await UserService.getUsers();

    expect(result).toEqual(mockUsers);
    expect(User.find).toHaveBeenCalled();
    expect(mockQuery.populate).toHaveBeenCalledWith({
      path: 'role',
      select: '_id name',
    });
  });
});
