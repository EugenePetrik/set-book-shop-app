const mongoose = require('mongoose');
const BookingStatusService = require('../../../../services/bookingStatus');
const { getBookingStatuses } = require('../../../../controllers/bookingStatus');

describe('Booking Status Controller - Get Booking Statuses', () => {
  it('should call BookingStatusService.getBookingStatuses and send a response', async () => {
    const bookingStatuses = Array.from({ length: 3 }, () => ({
      id: new mongoose.Types.ObjectId(),
      name: 'COMPLETED',
    }));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingStatusService.getBookingStatuses = jest
      .fn()
      .mockResolvedValue(bookingStatuses);
    await getBookingStatuses(req, res, next);

    expect(BookingStatusService.getBookingStatuses).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: bookingStatuses });
  });
});
