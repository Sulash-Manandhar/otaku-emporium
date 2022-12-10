import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderLayout from "../components/Header";

const Dashboard = () => {
  return (
    <Box>
      <HeaderLayout />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Dashboard;
