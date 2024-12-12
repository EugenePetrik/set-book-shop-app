const mongoose = require('mongoose');
const BookingStatus = require('../../../../models/BookingStatus');
const BookingStatusService = require('../../../../services/bookingStatus');

describe('Booking Status Service - Get Booking Status By ID', () => {
  let mockBookingStatusId;
  let mockBookingStatus;

  beforeEach(() => {
    mockBookingStatusId = new mongoose.Types.ObjectId();
    mockBookingStatus = { _id: mockBookingStatusId, name: 'SUBMITTED' };
  });

  it('should get a booking status by id', async () => {
    BookingStatus.findById.mockResolvedValue(mockBookingStatus);

    const result = await BookingStatusService.getBookingStatusById(mockBookingStatusId);

    expect(result).toEqual(mockBookingStatus);
    expect(BookingStatus.findById).toHaveBeenCalledWith(mockBookingStatusId);
  });

  it('should throw an error if booking status not found', async () => {
    BookingStatus.findById.mockResolvedValue(null);

    await expect(
      BookingStatusService.getBookingStatusById(mockBookingStatusId),
    ).rejects.toThrow(`Booking status not found with id of ${mockBookingStatusId}`);
    expect(BookingStatus.findById).toHaveBeenCalledWith(mockBookingStatusId);
  });
});
