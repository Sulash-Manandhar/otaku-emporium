import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  let token = localStorage.getItem("access_token");
  return token ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;
