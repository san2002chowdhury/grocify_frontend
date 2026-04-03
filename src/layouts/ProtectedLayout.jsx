import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = ({ allowedRole }) => {
  const { user } = useSelector((state) => state.user);

  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
