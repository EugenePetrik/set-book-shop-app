const mongoose = require('mongoose');
const BookingStatus = require('../../../../models/BookingStatus');
const BookingStatusService = require('../../../../services/bookingStatus');

describe('Booking Status Service - Update Booking Status', () => {
  let mockStatus;
  let mockUpdatedStatus;
  let mockBookingStatusId;

  beforeEach(() => {
    mockBookingStatusId = new mongoose.Types.ObjectId();
    mockStatus = { _id: mockBookingStatusId, name: 'SUBMITTED' };
    mockUpdatedStatus = { _id: mockBookingStatusId, name: 'APPROVED' };
  });

  it('should update a booking status', async () => {
    BookingStatus.findById.mockResolvedValue(mockStatus);
    BookingStatus.findByIdAndUpdate.mockResolvedValue(mockUpdatedStatus);

    const result = await BookingStatusService.updateBookingStatus(mockBookingStatusId, {
      name: mockUpdatedStatus.name,
    });

    expect(result).toEqual(mockUpdatedStatus);
    expect(BookingStatus.findById).toHaveBeenCalledWith(mockBookingStatusId);
    expect(BookingStatus.findByIdAndUpdate).toHaveBeenCalledWith(
      mockBookingStatusId,
      { name: mockUpdatedStatus.name },
      { new: true, runValidators: true },
    );
  });

  it('should throw an error if booking status not found', async () => {
    BookingStatus.findById.mockResolvedValue(null);

    await expect(
      BookingStatusService.updateBookingStatus(mockBookingStatusId, {
        name: mockUpdatedStatus.name,
      }),
    ).rejects.toThrow(`Booking status not found with id of ${mockBookingStatusId}`);
    expect(BookingStatus.findById).toHaveBeenCalledWith(mockBookingStatusId);
  });
});
