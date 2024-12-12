const mongoose = require('mongoose');
const BookingService = require('../../../../services/booking');
const { deleteBooking } = require('../../../../controllers/booking');

describe('Booking Controller - Delete Booking', () => {
  it('should call BookingService.deleteBooking and send a response', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const fakeUserId = new mongoose.Types.ObjectId().toString();
    const fakeRole = 'MANAGER';

    const req = {
      params: { id: fakeId },
      user: { id: fakeUserId, role: { name: fakeRole } },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingService.deleteBooking = jest.fn().mockResolvedValue();
    await deleteBooking(req, res, next);

    expect(BookingService.deleteBooking).toHaveBeenCalledWith(
      fakeId,
      fakeUserId,
      fakeRole,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });

  it('should handle errors and call next with the error', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const fakeUserId = new mongoose.Types.ObjectId().toString();
    const fakeRole = 'MANAGER';
    const error = new Error('Delete failed');

    const req = {
      params: { id: fakeId },
      user: { id: fakeUserId, role: { name: fakeRole } },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingService.deleteBooking = jest.fn().mockRejectedValue(error);
    await deleteBooking(req, res, next);

    expect(BookingService.deleteBooking).toHaveBeenCalledWith(
      fakeId,
      fakeUserId,
      fakeRole,
    );
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
