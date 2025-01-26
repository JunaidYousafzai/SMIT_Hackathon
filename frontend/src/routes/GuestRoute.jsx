import React from 'react'
import { useAuthentication } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const { token, user } = useAuthentication()

  if (!token) {
    return <Navigate to="/login" /> 
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" /> 
  }

  return <Outlet /> 
}

export default AdminRoute
