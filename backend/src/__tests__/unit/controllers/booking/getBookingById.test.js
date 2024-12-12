const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BookingService = require('../../../../services/booking');
const { getBookingById } = require('../../../../controllers/booking');

describe('Booking Controller - Get Booking By ID', () => {
  it('should call BookingService.getBookingById and send a response', async () => {
    const fakeBooking = {
      id: new mongoose.Types.ObjectId(),
      name: faker.commerce.productName(),
    };
    const fakeUserId = new mongoose.Types.ObjectId();
    const fakeRole = 'MANAGER';

    const req = {
      params: { id: fakeBooking.id.toString() },
      user: { id: fakeUserId.toString(), role: { name: fakeRole } },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingService.getBookingById = jest.fn().mockResolvedValue(fakeBooking);
    await getBookingById(req, res, next);

    expect(BookingService.getBookingById).toHaveBeenCalledWith(
      fakeBooking.id.toString(),
      fakeUserId.toString(),
      fakeRole,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeBooking });
  });

  it('should handle errors and call next with the error', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const fakeUserId = new mongoose.Types.ObjectId();
    const fakeRole = 'MANAGER';
    const error = new Error('Get failed');

    const req = {
      params: { id: fakeId.toString() },
      user: { id: fakeUserId.toString(), role: { name: fakeRole } },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingService.getBookingById = jest.fn().mockRejectedValue(error);
    await getBookingById(req, res, next);

    expect(BookingService.getBookingById).toHaveBeenCalledWith(
      fakeId.toString(),
      fakeUserId.toString(),
      fakeRole,
    );
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
