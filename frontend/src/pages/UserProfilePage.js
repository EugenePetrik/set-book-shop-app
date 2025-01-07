import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/authApi';
import Notification from '../components/Notification';

import '../styles/pages/UserProfilePage.css';

const UserProfilePage = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    login: '',
    password: '',
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setFormData({
          userId: userProfile.data._id,
          name: userProfile.data.name,
          email: userProfile.data.email,
          phone: userProfile.data.phone,
          address: userProfile.data.address,
          login: userProfile.data.login,
          password: '',
        });
        setNotification({ message: '', type: '' });
      } catch (error) {
        setNotification({
          message: error.response?.data?.message || 'Failed to fetch user profile',
          type: 'error',
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setNotification({ message: 'Profile updated successfully', type: 'success' });
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Failed to update profile',
        type: 'error',
      });
    }
  };

  return (
    <div className="user-profile-page">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            minLength="10"
            maxLength="15"
          />
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
          <label htmlFor="login">Login</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="**********"
            minLength="6"
          />
        </div>
        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;
