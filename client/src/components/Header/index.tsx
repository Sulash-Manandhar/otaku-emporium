import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";

const HeaderLayout = () => {
  return (
    <Box>
      <Header />
      <NavigationBar />
    </Box>
  );
};

export default HeaderLayout;
