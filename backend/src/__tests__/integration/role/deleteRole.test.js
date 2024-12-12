const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');
const { getRole } = require('../testData/role');

describe('Role API - DELETE /api/v1/roles/:id', () => {
  let app;
  let token;
  let role;

  beforeAll(async () => {
    app = createApp();
    role = await getRole('CUSTOMER');
    const userId = await getUserIdByRole('ADMIN');
    token = generateToken(userId);
  });

  const deleteRoleRequest = async (roleId, userToken) => {
    return request(app)
      .delete(`/api/v1/roles/${roleId}`)
      .set('Authorization', `Bearer ${userToken}`);
  };

  it('should return 404 if role not found', async () => {
    const nonExistentId = '609e24cce0a21a1b74c8d107';

    const response = await deleteRoleRequest(nonExistentId, token);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await deleteRoleRequest(role._id, null);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
