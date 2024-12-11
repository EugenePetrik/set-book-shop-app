const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Role API - POST /api/v1/roles', () => {
  let app;
  let token;

  beforeAll(async () => {
    app = createApp();
    const userId = await getUserIdByRole('ADMIN');
    token = generateToken(userId);
  });

  const createRoleRequest = async (roleName, userToken) => {
    return request(app)
      .post('/api/v1/roles')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: roleName });
  };

  it('should return 400 if role already exists', async () => {
    const response = await createRoleRequest('MANAGER', token);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await createRoleRequest('MANAGER', null);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
