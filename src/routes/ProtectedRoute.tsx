import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import { Routes } from "./config";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={Routes.Login.path} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
