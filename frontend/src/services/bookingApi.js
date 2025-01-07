import axiosInstance from './axiosInstance';

export const getBookings = async () => {
  try {
    const response = await axiosInstance.get('/bookings');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings', error);
    throw error;
  }
};

export const createBooking = async bookingData => {
  try {
    const response = await axiosInstance.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking', error);
    throw error;
  }
};

export const updateBooking = async (bookingId, bookingData) => {
  try {
    const response = await axiosInstance.put(`/bookings/${bookingId}`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking', error);
    throw error;
  }
};

export const deleteBooking = async bookingId => {
  try {
    const response = await axiosInstance.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting booking', error);
    throw error;
  }
};
