import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isConnected, userExists, children }) => {
  if (!isConnected) {
    return <Navigate to="/" replace />; // Redirect to landing page if not connected
  }

  if (userExists === false) {
    return <Navigate to="/selection-page" replace />; // Redirect to selection page if user doesn't exist
  }

  return children; // Render the children if all checks pass
};

export default ProtectedRoute;