import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { toast } from 'sonner';

const PrivateRoutes = () => {
    const isAuth = localStorage.getItem("token");
  return isAuth ?
  <Outlet />
  :
  <Navigate to="/">
    
    {toast.error("Debes iniciar sesión")}
</Navigate>
}

export default PrivateRoutes