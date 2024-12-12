const request = require('supertest');
const { createApp } = require('../../../createApp');

describe('Auth API - GET /api/v1/auth/logout', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  it('should logout a user', async () => {
    const response = await request(app).get('/api/v1/auth/logout');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({});
  });
});
