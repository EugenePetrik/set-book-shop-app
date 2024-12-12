const request = require('supertest');
const { createApp } = require('../../../createApp');
const {
  getUserIdByRole,
  createCustomer,
  getUpdateUserData,
} = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Users API - PUT /api/v1/users/:id', () => {
  let app;
  let user;
  let userIdToUpdate;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    user = await createCustomer();
    userIdToUpdate = user._id;
  });

  const updateUser = async (role, updatedData) => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);

    return request(app)
      .put(`/api/v1/users/${userIdToUpdate}`)
      .set('Authorization', token ? `Bearer ${token}` : '')
      .send(updatedData);
  };

  describe('admin', () => {
    it('should update a user by ID', async () => {
      const updatedData = getUpdateUserData();

      const response = await updateUser('ADMIN', updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('email', updatedData.email);
      expect(response.body.data).toHaveProperty('name', updatedData.name);
      expect(response.body.data).toHaveProperty('phone', updatedData.phone);
      expect(response.body.data).toHaveProperty('address', updatedData.address);
    });
  });

  describe('manager', () => {
    it('should update a user by ID', async () => {
      const updatedData = getUpdateUserData();

      const response = await updateUser('MANAGER', updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('email', updatedData.email);
      expect(response.body.data).toHaveProperty('name', updatedData.name);
      expect(response.body.data).toHaveProperty('phone', updatedData.phone);
      expect(response.body.data).toHaveProperty('address', updatedData.address);
    });
  });

  describe('customer', () => {
    it('should not update a user', async () => {
      const updatedData = getUpdateUserData();

      const response = await updateUser('CUSTOMER', updatedData);

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('unauthorized user', () => {
    it('should not update a user', async () => {
      const updatedData = getUpdateUserData();

      const response = await request(app)
        .put(`/api/v1/users/${userIdToUpdate}`)
        .send(updatedData);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  it('should return 404 if user is not found', async () => {
    const userId = await getUserIdByRole('ADMIN');
    const token = generateToken(userId);
    const nonExistentId = '609e24cce0a21a1b74c8d107';

    const response = await request(app)
      .put(`/api/v1/users/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'updated@example.com' });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(`User not found with id of ${nonExistentId}`);
  });
});
