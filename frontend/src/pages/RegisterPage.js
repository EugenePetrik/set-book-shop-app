import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authApi';
import Notification from '../components/Notification';

import '../styles/pages/RegisterPage.css';

const CUSTOMER_ROLE_ID = process.env.CUSTOMER_ROLE_ID;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    login: '',
    password: '',
  });

  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userData = { ...formData, role: CUSTOMER_ROLE_ID };
      await registerUser(userData);
      navigate('/profile');
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Something went wrong',
        type: 'error',
      });
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-page-container">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            minLength="10"
            maxLength="15"
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
          />
        </div>
        <div className="button-group">
          <button type="button" className="login-button" onClick={handleLoginClick}>
            Login
          </button>
          <button type="submit" className="register-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
