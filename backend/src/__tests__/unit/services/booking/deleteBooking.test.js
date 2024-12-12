const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BookingService = require('../../../../services/booking');
const Booking = require('../../../../models/Booking');
const StoreItem = require('../../../../models/StoreItem');

describe('Booking Service - Delete Booking', () => {
  const mockUserRole = 'USER';

  let mockUserId;
  let mockProductId;
  let mockBookingId;
  let mockQuantity;

  beforeEach(() => {
    mockUserId = new mongoose.Types.ObjectId();
    mockProductId = new mongoose.Types.ObjectId();
    mockBookingId = new mongoose.Types.ObjectId();
    mockQuantity = faker.number.int({ min: 1, max: 10 });
  });

  it('should delete the booking and update store item quantities', async () => {
    const initialAvailableQty = faker.number.int({ min: 10, max: 100 });
    const initialBookedQty = mockQuantity;
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
      quantity: mockQuantity,
    };
    const mockStoreItem = {
      available_qty: initialAvailableQty,
      booked_qty: initialBookedQty,
      save: jest.fn().mockResolvedValue(true),
    };

    Booking.findById = jest.fn().mockResolvedValue(mockBooking);
    StoreItem.findOne = jest.fn().mockResolvedValue(mockStoreItem);
    Booking.findByIdAndDelete = jest.fn().mockResolvedValue(mockBooking);

    const result = await BookingService.deleteBooking(
      mockBookingId,
      mockUserId.toString(),
      mockUserRole,
    );

    expect(result).toBeUndefined();
    expect(Booking.findByIdAndDelete).toHaveBeenCalledWith(mockBookingId);
    expect(mockStoreItem.booked_qty).toBe(initialBookedQty - mockQuantity);
    expect(mockStoreItem.available_qty).toBe(initialAvailableQty + mockQuantity);
    expect(mockStoreItem.save).toHaveBeenCalled();
  });

  it('should throw an error if the booking is not found', async () => {
    Booking.findById = jest.fn().mockResolvedValue(null);

    await expect(
      BookingService.deleteBooking(mockBookingId, mockUserId.toString(), mockUserRole),
    ).rejects.toThrow(`Booking not found with id of ${mockBookingId}`);
  });

  it('should throw an error if the user is not authorized', async () => {
    const unauthorizedUserId = new mongoose.Types.ObjectId();
    const mockBooking = { _id: mockBookingId, user: { _id: unauthorizedUserId } };

    Booking.findById = jest.fn().mockResolvedValue(mockBooking);

    await expect(
      BookingService.deleteBooking(mockBookingId, mockUserId.toString(), mockUserRole),
    ).rejects.toThrow('Not authorized to delete this booking');
  });

  it('should throw an error if no store item is found for the given product', async () => {
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
      quantity: mockQuantity,
    };

    Booking.findById = jest.fn().mockResolvedValue(mockBooking);
    Booking.findByIdAndDelete = jest.fn().mockResolvedValue(mockBooking);
    StoreItem.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      BookingService.deleteBooking(mockBookingId, mockUserId.toString(), 'MANAGER'),
    ).rejects.toThrow('Store item not found for the given product');
  });
});
