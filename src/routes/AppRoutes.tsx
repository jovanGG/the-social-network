import { Route, Routes } from "react-router-dom";

import { Routes as RoutesConfig } from "./config";
import Login from "../features/auth/pages/Login";
import Home from "../features/posts/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route index path={RoutesConfig.Home.path} element={<Home />} />
        </Route>
      </Route>
      <Route path={RoutesConfig.Login.path} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
