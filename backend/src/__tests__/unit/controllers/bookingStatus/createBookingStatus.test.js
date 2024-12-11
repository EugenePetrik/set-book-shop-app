const mongoose = require('mongoose');
const BookingStatusService = require('../../../../services/bookingStatus');
const { createBookingStatus } = require('../../../../controllers/bookingStatus');

describe('Booking Status Controller - Create Booking Status', () => {
  it('should call BookingStatusService.createBookingStatus and send a response', async () => {
    const fakeBookingStatus = {
      id: new mongoose.Types.ObjectId(),
      name: 'SUBMITTED',
    };

    const req = { body: { name: fakeBookingStatus.name } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingStatusService.createBookingStatus = jest
      .fn()
      .mockResolvedValue(fakeBookingStatus);
    await createBookingStatus(req, res, next);

    expect(BookingStatusService.createBookingStatus).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeBookingStatus });
  });
});
