import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getUserProfile } from '../services/authApi';

import '../styles/components/CreateBookingModal.css';

Modal.setAppElement('#root');

const SUBMITTED_STATUS_ID = '665dbbf7775e99e3f80dbb2a';

const CreateBookingModal = ({ isOpen, onRequestClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    quantity: 1,
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserId(userProfile.data._id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (userId) {
      onSave({
        product: product._id,
        user: userId,
        delivery_address: formData.address,
        date: formData.date,
        time: formData.time,
        status: SUBMITTED_STATUS_ID,
        quantity: formData.quantity,
      });
    } else {
      console.error('User not found');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Booking Request"
      className="modal create-booking-modal"
    >
      <h2>Booking Request</h2>
      <form>
        <div>
          <label htmlFor="product">Product:</label>
          <input type="text" name="product" value={product.name} readOnly />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            value={`$${product.price.toFixed(2)}`}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input type="text" name="time" value={formData.time} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
          <button type="button" onClick={handleSave}>
            Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBookingModal;
