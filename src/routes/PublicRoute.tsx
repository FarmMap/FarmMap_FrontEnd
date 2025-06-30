import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  const token = localStorage.getItem("authToken");
  return !token ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
