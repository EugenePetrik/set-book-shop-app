const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { addDays } = require('date-fns');
const BookingService = require('../../../../services/booking');
const Booking = require('../../../../models/Booking');
const StoreItem = require('../../../../models/StoreItem');

describe('Booking Service - Create Booking', () => {
  it('should create a booking and update store item quantities', async () => {
    const mockProduct = new mongoose.Types.ObjectId().toString();
    const mockQuantity = faker.number.int({ min: 1, max: 5 });

    const originalBookedQty = faker.number.int({ min: 0, max: 5 });
    const originalAvailableQty = faker.number.int({ min: mockQuantity, max: 20 });
    const originalSoldQty = faker.number.int({ min: mockQuantity, max: 20 });

    const mockStoreItem = {
      available_qty: originalAvailableQty,
      booked_qty: originalBookedQty,
      sold_qty: originalSoldQty,
      save: jest.fn().mockResolvedValue(true),
    };

    const mockDeliveryAddress = faker.location.streetAddress();

    const mockBooking = {
      _id: new mongoose.Types.ObjectId().toString(),
      product: mockProduct,
      quantity: mockQuantity,
      delivery_address: mockDeliveryAddress,
      save: jest.fn().mockResolvedValue({
        _id: new mongoose.Types.ObjectId().toString(),
        product: mockProduct,
        quantity: mockQuantity,
        delivery_address: mockDeliveryAddress,
        populate: jest.fn().mockResolvedValue({
          _id: new mongoose.Types.ObjectId().toString(),
          product: mockProduct,
          quantity: mockQuantity,
          delivery_address: mockDeliveryAddress,
        }),
      }),
    };

    StoreItem.findOne = jest.fn().mockResolvedValue(mockStoreItem);
    Booking.mockImplementation(() => mockBooking);

    const result = await BookingService.createBooking(
      {
        product: mockProduct,
        quantity: mockQuantity,
        delivery_address: mockDeliveryAddress,
        date: addDays(new Date(), 10).toISOString().split('T')[0],
        time: '10:00 AM',
        status: new mongoose.Types.ObjectId().toString(),
      },
      new mongoose.Types.ObjectId().toString(),
    );

    expect(result).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        product: mockProduct,
        quantity: mockQuantity,
        delivery_address: mockDeliveryAddress,
      }),
    );
    expect(StoreItem.findOne).toHaveBeenCalledWith({ product: mockProduct });
    expect(mockBooking.save).toHaveBeenCalled();
    expect(mockStoreItem.booked_qty).toBe(originalBookedQty + mockQuantity);
    expect(mockStoreItem.available_qty).toBe(originalAvailableQty - mockQuantity);
    expect(mockStoreItem.save).toHaveBeenCalled();
  });

  it('should throw an error if the store item is not found', async () => {
    const mockProduct = new mongoose.Types.ObjectId().toString();
    const mockStatus = new mongoose.Types.ObjectId().toString();
    const mockQuantity = faker.number.int({ min: 1, max: 5 });

    StoreItem.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      BookingService.createBooking(
        {
          product: mockProduct,
          quantity: mockQuantity,
          delivery_address: faker.location.streetAddress(),
          date: addDays(new Date(), 10).toISOString().split('T')[0],
          time: '11:00 AM',
          status: mockStatus,
        },
        new mongoose.Types.ObjectId().toString(),
      ),
    ).rejects.toThrow('Store item not found for the given product');
  });

  it('should throw an error if there is not enough available quantity', async () => {
    const mockProduct = new mongoose.Types.ObjectId().toString();
    const mockQuantity = faker.number.int({ min: 1, max: 5 });
    const mockStoreItem = {
      available_qty: mockQuantity - 1,
      booked_qty: faker.number.int({ min: 0, max: 1 }),
      sold_qty: faker.number.int({ min: 0, max: 1 }),
    };

    StoreItem.findOne = jest.fn().mockResolvedValue(mockStoreItem);

    await expect(
      BookingService.createBooking(
        {
          product: mockProduct,
          quantity: mockQuantity,
          delivery_address: faker.location.streetAddress(),
          date: addDays(new Date(), 10).toISOString().split('T')[0],
          time: '11:00 AM',
          status: new mongoose.Types.ObjectId().toString(),
        },
        new mongoose.Types.ObjectId().toString(),
      ),
    ).rejects.toThrow('Not enough available quantity to fulfill the booking');
  });

  it('should throw an error if a required field is missing', async () => {
    const mockUserId = new mongoose.Types.ObjectId();
    const mockBookingData = {
      product: new mongoose.Types.ObjectId(),
      delivery_address: faker.location.streetAddress(),
      date: new Date(),
      time: '12:00 PM',
      status: new mongoose.Types.ObjectId(),
      quantity: faker.number.int({ min: 1, max: 10 }),
    };

    const requiredFields = [
      'product',
      'delivery_address',
      'date',
      'time',
      'status',
      'quantity',
    ];

    for (const field of requiredFields) {
      const incompleteBookingData = { ...mockBookingData };
      delete incompleteBookingData[field];

      await expect(
        BookingService.createBooking(incompleteBookingData, mockUserId),
      ).rejects.toThrow(`Please provide a ${field}`);
    }
  });
});
