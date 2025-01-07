import React, { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '../services/bookingApi';
import { getUserProfile } from '../services/authApi';
import Notification from '../components/Notification';

import '../styles/pages/BookingCustomerPage.css';

const BookingCustomerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState(null);
  const bookingsPerPage = 3;
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserProfile();
        setUserId(userData.data._id);
        setNotification({ message: '', type: '' });
      } catch (error) {
        setNotification({ message: 'Failed to fetch user details', type: 'error' });
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookings();
        if (userId) {
          const userBookings = bookingsData.data.filter(
            booking => booking.user._id === userId,
          );
          setBookings(userBookings);
        } else {
          setBookings(bookingsData.data);
        }
        setNotification({ message: '', type: '' });
      } catch (error) {
        setNotification({ message: 'Failed to fetch bookings', type: 'error' });
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const handleUpdate = bookingId => {
    // TODO: Implement the booking update functionality
  };

  const handleCancel = async bookingId => {
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter(booking => booking._id !== bookingId));
      setNotification({ message: 'Booking canceled successfully', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Error cancelling booking', type: 'error' });
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current bookings
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  return (
    <div className="container booking-customer-page">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <h2>My Bookings</h2>
      <div className="booking-grid">
        {currentBookings.map(booking => (
          <div className="booking-card" key={booking._id}>
            {booking.product && (
              <>
                <img
                  src={booking.product.image_path}
                  alt={booking.product.name}
                  className="booking-image"
                />
                <h3 className="booking-title">{booking.product.name}</h3>
                <a href={`/products/${booking.product.slug}`} className="booking-link">
                  Product Link
                </a>
              </>
            )}
            <p className="booking-date">Date: {booking.date}</p>
            <p className="booking-time">Preferred Time: {booking.time}</p>
            <p className="booking-address">
              Delivery Address: {booking.delivery_address}
            </p>
            <p className="booking-status">Status: {booking.status.name}</p>
            <div className="booking-button-group">
              <button className="edit-button" onClick={() => handleUpdate(booking._id)}>
                Edit
              </button>
              <button className="cancel-button" onClick={() => handleCancel(booking._id)}>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination pagination-without-buttons">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(Math.ceil(bookings.length / bookingsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={number + 1 === currentPage ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(bookings.length / bookingsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingCustomerPage;
