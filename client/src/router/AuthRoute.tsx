import { Box } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLayout from "../components/Header";
import DataLoading from "../pages/DataLoading";

const AuthRoute = () => {
  let token = localStorage.getItem("access_token");
  return token ? (
    <Navigate to="/" />
  ) : (
    <Box>
      <HeaderLayout />
      <Suspense fallback={<DataLoading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </Box>
  );
};

export default AuthRoute;
