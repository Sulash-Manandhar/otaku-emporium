import { Box } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLayout from "../components/Header";
import DataLoading from "./DataLoading";

const Dashboard = () => {
  return (
    <Box>
      <HeaderLayout />
      <Suspense fallback={<DataLoading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </Box>
  );
};

export default Dashboard;
