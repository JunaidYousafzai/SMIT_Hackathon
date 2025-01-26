import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../context/AuthContext';

const UserRoute = () => {
  const { token, user } = useAuthentication();

  
  if (!token) {
    return <Navigate to="/signIn" />;
  }

  
  if (user.role && user.role !== 'admin') {
    return <Outlet />;
  }

  
  return <Navigate to="/not-authorized" />;
};

export default UserRoute;
