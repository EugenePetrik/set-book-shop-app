const mongoose = require('mongoose');
const BookingStatus = require('../../../../models/BookingStatus');
const BookingStatusService = require('../../../../services/bookingStatus');

describe('BookingStatus Service - Delete Booking Status', () => {
  let mockBookingStatusId;
  let mockBookingStatus;

  beforeEach(() => {
    mockBookingStatusId = new mongoose.Types.ObjectId();
    mockBookingStatus = { _id: mockBookingStatusId, name: 'SUBMITTED' };
  });

  it('should delete booking status', async () => {
    BookingStatus.findById.mockResolvedValue(mockBookingStatus);
    BookingStatus.findByIdAndDelete.mockResolvedValue(mockBookingStatus);

    const result = await BookingStatusService.deleteBookingStatus(mockBookingStatusId);

    expect(result).toBeUndefined();
    expect(BookingStatus.findByIdAndDelete).toHaveBeenCalledWith(mockBookingStatusId);
  });

  it('should throw an error if booking status not found', async () => {
    BookingStatus.findById.mockResolvedValue(null);

    await expect(
      BookingStatusService.deleteBookingStatus(mockBookingStatusId),
    ).rejects.toThrow(`Booking status not found with id of ${mockBookingStatusId}`);
  });
});
