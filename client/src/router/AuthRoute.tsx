import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLayout from "../components/Header";

const AuthRoute = () => {
  let token = localStorage.getItem("access_token");
  return token ? (
    <Navigate to="/" />
  ) : (
    <Box>
      <HeaderLayout />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default AuthRoute;
