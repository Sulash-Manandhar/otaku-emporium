import { Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
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
        <NavLink to="/">Home</NavLink>
        <NavLink to="/apparels">Apparels</NavLink>
        <NavLink to="/accessories">Accessories</NavLink>
      </Flex>
      <NavIconLink />
    </Flex>
  );
};

export default NavigationBar;
