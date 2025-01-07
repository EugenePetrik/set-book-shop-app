const mongoose = require('mongoose');
const BookingStatusService = require('../../../../services/bookingStatus');
const { updateBookingStatus } = require('../../../../controllers/bookingStatus');

describe('Booking Status Controller - Update Booking Status', () => {
  it('should call BookingStatusService.updateBookingStatus and send a response', async () => {
    const bookingStatus = {
      id: new mongoose.Types.ObjectId(),
      name: 'IN_DELIVERY',
    };
    const req = {
      params: { id: bookingStatus.id },
      body: { name: bookingStatus.name },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingStatusService.updateBookingStatus = jest.fn().mockResolvedValue(bookingStatus);
    await updateBookingStatus(req, res, next);

    expect(BookingStatusService.updateBookingStatus).toHaveBeenCalledWith(
      req.params.id,
      req.body,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: bookingStatus });
  });
});
