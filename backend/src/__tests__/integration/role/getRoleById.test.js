const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');
const { getRole } = require('../testData/role');

describe('Role API - GET /api/v1/roles/:id', () => {
  let app;
  let token;
  let role;

  beforeAll(async () => {
    app = createApp();
    role = await getRole('MANAGER');
    const userId = await getUserIdByRole('ADMIN');
    token = generateToken(userId);
  });

  const getRoleRequest = async (roleId, userToken) => {
    return request(app)
      .get(`/api/v1/roles/${roleId}`)
      .set('Authorization', `Bearer ${userToken}`);
  };

  it('should get a specific role by ID', async () => {
    const response = await getRoleRequest(role._id, token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id', role._id.toString());
    expect(response.body.data).toHaveProperty('name', 'MANAGER');
  });

  it('should return 404 if role not found', async () => {
    const nonExistentId = '609e24cce0a21a1b74c8d107';

    const response = await getRoleRequest(nonExistentId, token);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await getRoleRequest(role._id, null);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
