import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';
import UserProfilePage from './pages/UserProfilePage';
import ProductCatalogueCustomerPage from './pages/ProductCatalogueCustomerPage';
import ProductCatalogueManagerPage from './pages/ProductCatalogueManagerPage';
import BookingCustomerPage from './pages/BookingCustomerPage';
import BookingManagerPage from './pages/BookingManagerPage';
import StorePage from './pages/StorePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<ProtectedRoute element={LoginPage} isPrivate={false} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute element={RegisterPage} isPrivate={false} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={UserProfilePage}
                isPrivate={true}
                allowedRoles={['MANAGER', 'CUSTOMER']}
              />
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute
                element={UsersPage}
                isPrivate={true}
                allowedRoles={['MANAGER']}
              />
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute
                managerComponent={BookingManagerPage}
                customerComponent={BookingCustomerPage}
                isPrivate={true}
                allowedRoles={['MANAGER', 'CUSTOMER']}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute
                managerComponent={ProductCatalogueManagerPage}
                customerComponent={ProductCatalogueCustomerPage}
                isPrivate={true}
                allowedRoles={['MANAGER', 'CUSTOMER']}
              />
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute
                element={StorePage}
                isPrivate={true}
                allowedRoles={['MANAGER']}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
