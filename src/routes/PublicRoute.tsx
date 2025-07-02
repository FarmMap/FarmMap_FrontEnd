import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  return !token ? <Outlet /> : <Navigate to="/admin" />;
};

export default PublicRoute;
