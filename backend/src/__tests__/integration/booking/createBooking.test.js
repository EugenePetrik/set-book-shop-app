const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { addDays } = require('date-fns');
const { createApp } = require('../../../createApp');
const { generateToken } = require('../utils/generateToken');
const { createCustomer } = require('../testData/user');
const { getUserIdByRole } = require('../testData/user');
const { createProductWithStore } = require('../testData/product');
const { getBooking, getBookingStatusId } = require('../testData/booking');

describe('Booking API - POST /api/v1/bookings', () => {
  let app;
  let user;

  beforeAll(async () => {
    app = createApp();
    user = await createCustomer();
  });

  const performBooking = async (bookingData, token) =>
    request(app)
      .post('/api/v1/bookings')
      .send(bookingData)
      .set('Authorization', `Bearer ${token}`);

  it('should create a new booking', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const { product } = await createProductWithStore();
    const bookingData = await getBooking(user._id.toString(), product._id.toString());

    const response = await performBooking(bookingData, token);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      delivery_address: bookingData.delivery_address,
      date: bookingData.date,
      time: bookingData.time,
      quantity: bookingData.quantity,
    });
  });

  it('should return 400 if required fields are missing', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);

    const response = await performBooking({}, token);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should return 404 if product not found', async () => {
    const userId = await getUserIdByRole('MANAGER');
    const token = generateToken(userId);
    const invalidProductId = '60c72b2f9b1e8b0f8cf9b6e4';
    const bookingData = await getBooking(user._id, invalidProductId);

    const response = await performBooking(bookingData, token);

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should return 400 if there is not enough available quantity to fulfill the booking', async () => {
    const { product } = await createProductWithStore();
    const status = await getBookingStatusId();
    const customer = await createCustomer();
    const token = generateToken(customer._id);

    const bookingData = {
      product: product._id,
      user: customer._id,
      status: status._id,
      delivery_address: faker.location.streetAddress(),
      date: addDays(new Date(), 10).toISOString().split('T')[0],
      time: '11:00 AM',
      quantity: 1000,
    };

    const response = await performBooking(bookingData, token);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'Not enough available quantity to fulfill the booking',
    );
  });
});
