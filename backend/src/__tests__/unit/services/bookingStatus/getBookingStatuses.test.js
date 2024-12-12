const BookingStatus = require('../../../../models/BookingStatus');
const BookingStatusService = require('../../../../services/bookingStatus');

describe('Booking Status Service - Get Booking Statuses', () => {
  it('should get all booking statuses', async () => {
    const mockBookingStatuses = [{ name: 'SUBMITTED' }, { name: 'APPROVED' }];
    BookingStatus.find.mockResolvedValue(mockBookingStatuses);

    const result = await BookingStatusService.getBookingStatuses();

    expect(result).toEqual(mockBookingStatuses);
    expect(BookingStatus.find).toHaveBeenCalled();
  });
});
