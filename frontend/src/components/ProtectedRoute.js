import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  element: Component,
  managerComponent: ManagerComponent,
  customerComponent: CustomerComponent,
  allowedRoles,
  isPrivate,
  ...rest
}) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (isPrivate && !token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/profile" />;
  }

  if (!isPrivate && token) {
    return <Navigate to="/profile" />;
  }

  if (role === 'MANAGER' && ManagerComponent) {
    return <ManagerComponent {...rest} />;
  }

  if (role === 'CUSTOMER' && CustomerComponent) {
    return <CustomerComponent {...rest} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
