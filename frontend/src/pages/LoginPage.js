import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authApi';
import Notification from '../components/Notification';

import '../styles/pages/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      await loginUser(formData);
      navigate('/profile');
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Login failed',
        type: 'error',
      });
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page-container">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Email</label>
          <input
            type="text"
            id="login"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <div className="button-group">
          <button type="button" className="register-button" onClick={handleRegisterClick}>
            Register
          </button>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
