const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BookingService = require('../../../../services/booking');
const Booking = require('../../../../models/Booking');

describe('Booking Service - Get Booking By ID', () => {
  let mockUserId;
  let mockProductId;
  let mockBookingId;
  let mockStatusId;

  beforeEach(() => {
    mockUserId = new mongoose.Types.ObjectId();
    mockProductId = new mongoose.Types.ObjectId();
    mockBookingId = new mongoose.Types.ObjectId();
    mockStatusId = new mongoose.Types.ObjectId();
  });

  it('should return the booking if the user is authorized', async () => {
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      populate: jest.fn().mockResolvedValue({
        _id: mockBookingId,
        user: { _id: mockUserId },
        product: { _id: mockProductId },
        status: { _id: mockStatusId },
      }),
    };

    Booking.findById = jest.fn().mockResolvedValue(mockBooking);

    const result = await BookingService.getBookingById(
      mockBookingId.toString(),
      mockUserId.toString(),
      'USER',
    );

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockBookingId,
        user: { _id: mockUserId },
        product: { _id: mockProductId },
        status: { _id: mockStatusId },
      }),
    );
    expect(Booking.findById).toHaveBeenCalledWith(mockBookingId.toString());
    expect(mockBooking.populate).toHaveBeenCalled();
  });

  it('should return the booking if the user is a manager', async () => {
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      populate: jest.fn().mockResolvedValue({
        _id: mockBookingId,
        user: { _id: mockUserId },
        product: { _id: mockProductId },
        status: { _id: mockStatusId },
      }),
    };

    Booking.findById = jest.fn().mockResolvedValue(mockBooking);

    const result = await BookingService.getBookingById(
      mockBookingId.toString(),
      mockUserId.toString(),
      'MANAGER',
    );

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockBookingId,
        user: { _id: mockUserId },
        product: { _id: mockProductId },
        status: { _id: mockStatusId },
      }),
    );
    expect(Booking.findById).toHaveBeenCalledWith(mockBookingId.toString());
    expect(mockBooking.populate).toHaveBeenCalled();
  });

  it('should throw an error if the booking is not found', async () => {
    Booking.findById = jest.fn().mockResolvedValue(null);

    await expect(
      BookingService.getBookingById(
        mockBookingId.toString(),
        faker.string.uuid(),
        'USER',
      ),
    ).rejects.toThrow(`Booking not found with id of ${mockBookingId}`);
  });

  it('should throw an error if the user is not authorized', async () => {
    const unauthorizedUserId = new mongoose.Types.ObjectId();
    const mockBooking = { _id: mockBookingId, user: { _id: unauthorizedUserId } };

    Booking.findById = jest.fn().mockResolvedValue(mockBooking);

    await expect(
      BookingService.getBookingById(
        mockBookingId.toString(),
        faker.string.uuid(),
        'USER',
      ),
    ).rejects.toThrow('Not authorized to access this booking');
  });
});
