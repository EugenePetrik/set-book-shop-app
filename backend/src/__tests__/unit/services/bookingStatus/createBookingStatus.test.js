const BookingStatus = require('../../../../models/BookingStatus');
const BookingStatusService = require('../../../../services/bookingStatus');

describe('Booking Status Service - Create Booking Status', () => {
  it('should create a new booking status', async () => {
    const mockStatusData = { name: 'SUBMITTED' };
    const mockStatus = {
      ...mockStatusData,
      save: jest.fn().mockResolvedValue(mockStatusData),
    };
    BookingStatus.mockImplementation(() => mockStatus);

    const result = await BookingStatusService.createBookingStatus(mockStatusData);

    expect(result).toEqual(mockStatusData);
    expect(BookingStatus).toHaveBeenCalledWith(mockStatusData);
    expect(mockStatus.save).toHaveBeenCalled();
  });
});
