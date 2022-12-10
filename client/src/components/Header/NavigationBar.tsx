import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import NavIconLink from "./NavIconLink";

const NavigationBar = () => {
  return (
    <Flex
      color="white"
      px="8"
      py="2"
      backgroundColor="green.400"
      justifyContent="space-between"
      alignItems="Center"
    >
      <Flex gap="16px">
        <Link to="/">Home</Link>
        <Link to="/apparels">Apparels</Link>
        <Link to="/accessories">Accessories</Link>
      </Flex>
      <NavIconLink />
    </Flex>
  );
};

export default NavigationBar;
