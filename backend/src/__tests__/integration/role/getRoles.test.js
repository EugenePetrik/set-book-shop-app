const request = require('supertest');
const { createApp } = require('../../../createApp');
const { getUserIdByRole } = require('../testData/user');
const { generateToken } = require('../utils/generateToken');

describe('Role API - GET /api/v1/roles', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
  });

  const getRolesRequest = async token => {
    return request(app).get('/api/v1/roles').set('Authorization', `Bearer ${token}`);
  };

  it('should get all roles', async () => {
    const userId = await getUserIdByRole('ADMIN');
    const token = generateToken(userId);

    const response = await getRolesRequest(token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should return 401 for unauthorized user', async () => {
    const response = await getRolesRequest(null);

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
