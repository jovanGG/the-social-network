import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import { Routes } from "./config";

const PublicRoute = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to={Routes.Home.path} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
