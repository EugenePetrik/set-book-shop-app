const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BookingService = require('../../../../services/booking');
const { createBooking } = require('../../../../controllers/booking');

describe('Booking Controller - Create Booking', () => {
  it('should call BookingService.createBooking and send a response', async () => {
    const fakeBooking = {
      id: new mongoose.Types.ObjectId(),
      name: faker.commerce.productName(),
      user: new mongoose.Types.ObjectId(),
      date: faker.date.future(),
      time: '10:00 AM',
      quantity: faker.number.int({ min: 1, max: 5 }),
      delivery_address: faker.location.streetAddress(),
      status: 'SUBMITTED',
    };
    const req = {
      body: {
        name: fakeBooking.name,
        date: fakeBooking.date,
        time: fakeBooking.time,
        quantity: fakeBooking.quantity,
        delivery_address: fakeBooking.delivery_address,
      },
      user: { id: fakeBooking.user },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingService.createBooking = jest.fn().mockResolvedValue(fakeBooking);

    await createBooking(req, res, next);

    expect(BookingService.createBooking).toHaveBeenCalledWith(req.body, req.user.id);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeBooking });
  });

  it('should handle errors and call next with the error', async () => {
    const error = new Error('Something went wrong');
    const req = {
      body: {
        name: faker.commerce.productName(),
        date: faker.date.future(),
        time: '10:00 AM',
        quantity: faker.number.int({ min: 1, max: 5 }),
        delivery_address: faker.location.streetAddress(),
      },
      user: { id: new mongoose.Types.ObjectId() },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BookingService.createBooking = jest.fn().mockRejectedValue(error);

    await createBooking(req, res, next);

    expect(BookingService.createBooking).toHaveBeenCalledWith(req.body, req.user.id);
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
