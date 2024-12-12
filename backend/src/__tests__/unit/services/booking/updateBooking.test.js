const mongoose = require('mongoose');
const BookingService = require('../../../../services/booking');
const Booking = require('../../../../models/Booking');
const StoreItem = require('../../../../models/StoreItem');

describe('Booking Service - Update Booking', () => {
  let mockBookingId;
  let mockProductId;
  let mockUserId;

  beforeEach(() => {
    mockBookingId = new mongoose.Types.ObjectId();
    mockProductId = new mongoose.Types.ObjectId();
    mockUserId = new mongoose.Types.ObjectId();
  });

  it('should adjust quantities correctly when status changes from IN_DELIVERY to COMPLETED', async () => {
    const updatedData = { status: 'COMPLETED' };
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
      quantity: 1,
      status: 'IN_DELIVERY',
      save: jest.fn().mockImplementation(function () {
        Object.assign(this, updatedData);
        return Promise.resolve({
          ...this,
          populate: jest.fn().mockResolvedValue({
            ...this,
          }),
        });
      }),
    };
    const mockStoreItem = {
      available_qty: 10,
      booked_qty: 0,
      sold_qty: 1,
      save: jest.fn().mockImplementation(function () {
        this.sold_qty += mockBooking.quantity;
        Object.assign(this, mockStoreItem);
        return Promise.resolve(this);
      }),
    };

    Booking.findById.mockResolvedValue(mockBooking);
    StoreItem.findOne.mockResolvedValue(mockStoreItem);

    const result = await BookingService.updateBooking(
      mockBookingId,
      updatedData,
      mockUserId,
      'MANAGER',
    );

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockBookingId,
        user: { _id: mockUserId },
        product: mockProductId,
        quantity: 1,
        status: 'COMPLETED',
      }),
    );
    expect(mockStoreItem.sold_qty).toBe(2);
    expect(mockStoreItem.save).toHaveBeenCalled();
  });

  it('should adjust quantities correctly when status changes from APPROVED to CANCELED', async () => {
    const updatedData = { status: 'CANCELED' };
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
      quantity: 1,
      status: 'APPROVED',
      save: jest.fn().mockImplementation(function () {
        Object.assign(this, updatedData);
        return Promise.resolve({
          ...this,
          populate: jest.fn().mockResolvedValue({
            ...this,
          }),
        });
      }),
    };
    const mockStoreItem = {
      available_qty: 9,
      booked_qty: 1,
      save: jest.fn().mockImplementation(function () {
        this.booked_qty -= mockBooking.quantity;
        this.available_qty += mockBooking.quantity;
        Object.assign(this, mockStoreItem);
        return Promise.resolve(this);
      }),
    };

    Booking.findById.mockResolvedValue(mockBooking);
    StoreItem.findOne.mockResolvedValue(mockStoreItem);

    const result = await BookingService.updateBooking(
      mockBookingId,
      updatedData,
      mockUserId,
      'MANAGER',
    );

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockBookingId,
        user: { _id: mockUserId },
        product: mockProductId,
        quantity: 1,
        status: 'CANCELED',
      }),
    );
    expect(mockStoreItem.booked_qty).toBe(0);
    expect(mockStoreItem.available_qty).toBe(10);
    expect(mockStoreItem.save).toHaveBeenCalled();
  });

  it('should adjust quantities correctly when status changes from APPROVED to IN_DELIVERY', async () => {
    const updatedData = { status: 'IN_DELIVERY' };
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
      quantity: 1,
      status: 'APPROVED',
      save: jest.fn().mockImplementation(function () {
        Object.assign(this, updatedData);
        return Promise.resolve({
          ...this,
          populate: jest.fn().mockResolvedValue({
            ...this,
          }),
        });
      }),
    };
    const mockStoreItem = {
      available_qty: 10,
      booked_qty: 1,
      sold_qty: 0,
      save: jest.fn().mockImplementation(function () {
        this.booked_qty -= mockBooking.quantity;
        this.sold_qty += mockBooking.quantity;
        Object.assign(this, mockStoreItem);
        return Promise.resolve(this);
      }),
    };

    Booking.findById.mockResolvedValue(mockBooking);
    StoreItem.findOne.mockResolvedValue(mockStoreItem);

    const result = await BookingService.updateBooking(
      mockBookingId,
      updatedData,
      mockUserId,
      'MANAGER',
    );

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockBookingId,
        user: { _id: mockUserId },
        product: mockProductId,
        quantity: 1,
        status: 'IN_DELIVERY',
      }),
    );
    expect(mockStoreItem.booked_qty).toBe(0);
    expect(mockStoreItem.sold_qty).toBe(1);
    expect(mockStoreItem.save).toHaveBeenCalled();
  });

  it('should adjust quantities correctly when the quantity changes', async () => {
    const updatedData = { quantity: 3 };
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
      quantity: 1,
      status: 'APPROVED',
      save: jest.fn().mockImplementation(function () {
        Object.assign(this, updatedData);
        return Promise.resolve({
          ...this,
          populate: jest.fn().mockResolvedValue({
            ...this,
          }),
        });
      }),
    };
    const mockStoreItem = {
      available_qty: 10,
      booked_qty: 1,
      save: jest.fn().mockImplementation(function () {
        const quantityDifference = updatedData.quantity - mockBooking.quantity;
        if (quantityDifference !== 0) {
          this.booked_qty += quantityDifference;
          this.available_qty -= quantityDifference;
        }
        Object.assign(this, mockStoreItem);
        return Promise.resolve(this);
      }),
    };

    Booking.findById.mockResolvedValue(mockBooking);
    StoreItem.findOne.mockResolvedValue(mockStoreItem);

    const result = await BookingService.updateBooking(
      mockBookingId,
      updatedData,
      mockUserId,
      'MANAGER',
    );

    expect(result).toEqual(
      expect.objectContaining({
        _id: mockBookingId,
        user: { _id: mockUserId },
        product: mockProductId,
        quantity: 3,
        status: 'APPROVED',
      }),
    );
    expect(mockStoreItem.booked_qty).toBe(3);
    expect(mockStoreItem.available_qty).toBe(8);
    expect(mockStoreItem.save).toHaveBeenCalled();
  });

  it('should throw an error if the booking is not found', async () => {
    Booking.findById = jest.fn().mockResolvedValue(null);

    await expect(
      BookingService.updateBooking(mockBookingId, {}, mockUserId, 'USER'),
    ).rejects.toThrow(`Booking not found with id of ${mockBookingId}`);
  });

  it('should throw an error if the user is not authorized', async () => {
    const mockBooking = {
      _id: new mongoose.Types.ObjectId(),
      user: { _id: new mongoose.Types.ObjectId() },
    };

    Booking.findById.mockResolvedValue(mockBooking);

    await expect(
      BookingService.updateBooking(mockBookingId, {}, mockUserId, 'USER'),
    ).rejects.toThrow('Not authorized to update this booking');
  });

  it('should throw an error if the store item is not found', async () => {
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
    };

    Booking.findById.mockResolvedValue(mockBooking);
    StoreItem.findOne.mockResolvedValue(null);

    await expect(
      BookingService.updateBooking(mockBookingId, {}, mockUserId, 'MANAGER'),
    ).rejects.toThrow('Store item not found for the given product');
  });

  it('should throw an error if not enough available quantity to update the booking', async () => {
    const updatedData = { quantity: 5 };
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
      quantity: 1,
    };
    const mockStoreItem = {
      available_qty: 3,
      booked_qty: 1,
      save: jest.fn(),
    };

    Booking.findById.mockResolvedValue(mockBooking);
    StoreItem.findOne.mockResolvedValue(mockStoreItem);

    await expect(
      BookingService.updateBooking(mockBookingId, updatedData, mockUserId, 'MANAGER'),
    ).rejects.toThrow('Not enough available quantity to update the booking');

    expect(StoreItem.findOne).toHaveBeenCalledWith({ product: mockBooking.product });
    expect(Booking.findById).toHaveBeenCalledWith(mockBookingId);
  });

  it('should throw an error if there is not enough available quantity to update the booking', async () => {
    const updatedData = { quantity: 15 };
    const mockBooking = {
      _id: mockBookingId,
      user: { _id: mockUserId },
      product: mockProductId,
      quantity: 10,
    };
    const mockStoreItem = {
      available_qty: 4,
      booked_qty: 10,
      save: jest.fn(),
    };

    Booking.findById.mockResolvedValue(mockBooking);
    StoreItem.findOne.mockResolvedValue(mockStoreItem);

    await expect(
      BookingService.updateBooking(mockBookingId, updatedData, mockProductId, 'MANAGER'),
    ).rejects.toThrow('Not enough available quantity to update the booking');
  });
});
