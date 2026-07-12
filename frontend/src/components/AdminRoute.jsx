import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullPage />;
  }

  if (!user || user.role !== 'admin') {
    // If not admin, redirect to homepage
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
