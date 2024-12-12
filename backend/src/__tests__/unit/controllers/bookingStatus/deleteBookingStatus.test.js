const mongoose = require('mongoose');
const BookingStatusService = require('../../../../services/bookingStatus');
const { deleteBookingStatus } = require('../../../../controllers/bookingStatus');

describe('Booking Status Controller - Delete Booking Status', () => {
  it('should call BookingStatusService.deleteBookingStatus and send a response', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const req = { params: { id: fakeId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingStatusService.deleteBookingStatus = jest.fn().mockResolvedValue();
    await deleteBookingStatus(req, res, next);

    expect(BookingStatusService.deleteBookingStatus).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });
});
