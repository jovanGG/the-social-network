import { Navigate, Route, Routes } from "react-router-dom";

import { Routes as RoutesConfig } from "./config";
import Login from "../features/auth/pages/Login";
import Home from "../features/posts/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Layout";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index path={RoutesConfig.Home.path} element={<Home />} />
        </Route>
        <Route
          path="/"
          element={<Navigate to={RoutesConfig.Home.path} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={RoutesConfig.Home.path} replace />}
        />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path={RoutesConfig.Login.path} element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
