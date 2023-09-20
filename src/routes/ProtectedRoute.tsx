import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import { Routes } from "./config";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={Routes.Login.path} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
