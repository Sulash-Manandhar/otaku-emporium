import { Box } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLayout from "../components/Header";
import DataLoading from "../pages/DataLoading";
import { getAccessToken } from "../utils/auth";

const PrivateRoute = () => {
  let token = getAccessToken();
  return token ? (
    <Box>
      <HeaderLayout />
      <Suspense fallback={<DataLoading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </Box>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
