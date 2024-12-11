const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BookingService = require('../../../../services/booking');
const Booking = require('../../../../models/Booking');

describe('Booking Service - Get Bookings', () => {
  it('should return bookings if the user is a manager', async () => {
    const mockBookings = [
      {
        _id: new mongoose.Types.ObjectId(),
        product: new mongoose.Types.ObjectId(),
        user: new mongoose.Types.ObjectId(),
        status: faker.lorem.word(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        product: new mongoose.Types.ObjectId(),
        user: new mongoose.Types.ObjectId(),
        status: faker.lorem.word(),
      },
    ];

    Booking.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockBookings),
    });

    const result = await BookingService.getBookings('MANAGER');

    expect(result).toEqual(mockBookings);

    expect(Booking.find).toHaveBeenCalled();
  });
});
