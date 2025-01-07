import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useIsAuthRoute from '../utils/isAuthRoute';

import '../styles/components/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthRoute = useIsAuthRoute();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className={isAuthRoute ? 'simple-header' : 'header'}>
      <div className="logo">
        <Link to="/login">BookShop</Link>
      </div>
      {!isAuthRoute && (
        <>
          <nav className="nav-links">
            <Link
              className={location.pathname === '/products' ? 'active' : ''}
              to="/products"
            >
              Catalogue
            </Link>
            <Link
              className={location.pathname === '/bookings' ? 'active' : ''}
              to="/bookings"
            >
              Bookings
            </Link>
            {role === 'MANAGER' && (
              <>
                <Link
                  className={location.pathname === '/store' ? 'active' : ''}
                  to="/store"
                >
                  Store
                </Link>
                <Link
                  className={location.pathname === '/users' ? 'active' : ''}
                  to="/users"
                >
                  Users
                </Link>
              </>
            )}
            <Link
              className={location.pathname === '/profile' ? 'active' : ''}
              to="/profile"
            >
              User Profile
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          </nav>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button className="search-button">Search</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
