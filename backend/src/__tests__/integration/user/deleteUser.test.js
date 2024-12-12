const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole, createCustomer } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Users API - DELETE /api/v1/users/:id', () => {
  let app;
  let user;

  beforeAll(async () => {
    app = createApp();
  });

  beforeEach(async () => {
    user = await createCustomer();
  });

  const deleteUser = async role => {
    const userId = await getUserIdByRole(role);
    const token = generateToken(userId);

    return request(app)
      .delete(`/api/v1/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`);
  };

  describe('admin', () => {
    it('should delete a user by ID', async () => {
      const response = await deleteUser('ADMIN');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual({});
    });
  });

  describe('manager', () => {
    it('should delete a user by ID', async () => {
      const response = await deleteUser('MANAGER');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual({});
    });
  });

  describe('customer', () => {
    it('should not delete a user', async () => {
      const response = await deleteUser('CUSTOMER');

      expect(response.statusCode).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('unauthorized user', () => {
    it('should not delete a user', async () => {
      const response = await request(app).delete(`/api/v1/users/${user._id}`);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  it('should return 404 if user is not found', async () => {
    const nonExistentId = '609e24cce0a21a1b74c8d107';
    const userId = await getUserIdByRole('ADMIN');
    const token = generateToken(userId);

    const response = await request(app)
      .delete(`/api/v1/users/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(`User not found with id of ${nonExistentId}`);
  });
});
