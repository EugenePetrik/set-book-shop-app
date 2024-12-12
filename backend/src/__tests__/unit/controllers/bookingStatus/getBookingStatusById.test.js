const mongoose = require('mongoose');
const BookingStatusService = require('../../../../services/bookingStatus');
const { getBookingStatusById } = require('../../../../controllers/bookingStatus');

describe('Booking Status Controller - Get Booking Status By ID', () => {
  it('should call BookingStatusService.getBookingStatusById and send a response', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const fakeStatus = {
      id: fakeId,
      name: 'APPROVED',
    };

    const req = { params: { id: fakeId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingStatusService.getBookingStatusById = jest.fn().mockResolvedValue(fakeStatus);
    await getBookingStatusById(req, res, next);

    expect(BookingStatusService.getBookingStatusById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeStatus });
  });
});
