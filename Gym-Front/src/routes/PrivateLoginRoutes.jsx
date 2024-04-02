import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { toast } from 'sonner';

const PrivateLoginRoutes = () => {
    const isAuth = localStorage.getItem("token");
  return !isAuth ?
  <Outlet />
  :
  <Navigate to="/main">
    
</Navigate>
}

export default PrivateLoginRoutes