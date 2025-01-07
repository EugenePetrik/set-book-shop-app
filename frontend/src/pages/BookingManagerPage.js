import React, { useState, useEffect } from 'react';
import { getBookings, updateBooking } from '../services/bookingApi';
import Notification from '../components/Notification';

import '../styles/pages/BookingManagerPage.css';

const SUBMITTED_STATUS_ID = '665dbbf7775e99e3f80dbb2a';
const APPROVED_STATUS_ID = '665dbc05775e99e3f80dbb2e';
const REJECTED_STATUS_ID = '665dbc00775e99e3f80dbb2c';
const CLOSED_STATUS_ID = '665dbc12775e99e3f80dbb34';

const BookingManagerPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    productName: '',
    date: '',
    address: '',
    status: '',
  });

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookings();
        const submittedBookings = bookingsData.data.filter(
          booking => booking.status._id === SUBMITTED_STATUS_ID,
        );
        setBookings(submittedBookings);
        setNotification({ message: '', type: '' });
      } catch (error) {
        setNotification({ message: 'Failed to fetch bookings', type: 'error' });
      }
    };

    fetchBookings();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async e => {
    e.preventDefault();
    // TODO: Implement the booking search functionality
  };

  const handleUpdateBooking = async (bookingId, status) => {
    try {
      await updateBooking(bookingId, { status });
      setNotification({ message: 'Booking updated successfully', type: 'success' });
      // Refresh bookings list
      const bookingsData = await getBookings();
      const submittedBookings = bookingsData.data.filter(
        booking => booking.status._id === SUBMITTED_STATUS_ID,
      );
      setBookings(submittedBookings);
    } catch (error) {
      setNotification({ message: 'Failed to update booking', type: 'error' });
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current bookings
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  return (
    <div className="container booking-manager-page">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select status</option>
            <option value={APPROVED_STATUS_ID}>Approved</option>
            <option value={REJECTED_STATUS_ID}>Rejected</option>
            <option value={CLOSED_STATUS_ID}>Closed</option>
          </select>
        </div>
        <div className="search-button-container">
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      <h3>Search Results</h3>
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
              </>
            )}
            <p>Product ID: {booking.product._id}</p>
            <p>User: {booking.user.name}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Address: {booking.delivery_address}</p>
            <p>Status: {booking.status.name}</p>
            <div className="booking-button-group">
              <button
                className="approve-button"
                onClick={() => handleUpdateBooking(booking._id, APPROVED_STATUS_ID)}
              >
                Approve
              </button>
              <button
                className="reject-button"
                onClick={() => handleUpdateBooking(booking._id, REJECTED_STATUS_ID)}
              >
                Reject
              </button>
              <button
                className="close-button"
                onClick={() => handleUpdateBooking(booking._id, CLOSED_STATUS_ID)}
              >
                Close
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

export default BookingManagerPage;
