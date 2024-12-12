const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BookingService = require('../../../../services/booking');
const { updateBooking } = require('../../../../controllers/booking');

describe('Booking Controller - Update Booking', () => {
  it('should call BookingService.updateBooking and send a response', async () => {
    const fakeBooking = {
      id: new mongoose.Types.ObjectId(),
      name: faker.commerce.productName(),
    };
    const fakeUserId = new mongoose.Types.ObjectId();
    const fakeRole = 'MANAGER';

    const req = {
      params: { id: fakeBooking.id },
      body: { name: fakeBooking.name },
      user: { id: fakeUserId, role: { name: fakeRole } },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingService.updateBooking = jest.fn().mockResolvedValue(fakeBooking);
    await updateBooking(req, res, next);

    expect(BookingService.updateBooking).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role.name,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeBooking });
  });
});
