const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BookingService = require('../../../../services/booking');
const { getBookings } = require('../../../../controllers/booking');

describe('Booking Controller - Get Bookings', () => {
  it('should call BookingService.getBookings and send a response', async () => {
    const fakeBookings = [
      {
        id: new mongoose.Types.ObjectId(),
        name: faker.commerce.productName(),
      },
    ];

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingService.getBookings = jest.fn().mockResolvedValue(fakeBookings);
    await getBookings(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeBookings });
  });
});
