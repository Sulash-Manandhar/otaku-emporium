import { Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
import NavIconLink from "./NavIconLink";
import { PUBLIC_LINK } from "../../constant/link";
import { linkDetail } from "../../Schema/link.schema";

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
        {PUBLIC_LINK.map((item: linkDetail) => (
          <NavLink key={item.id} to={item.path}>
            {item.name}
          </NavLink>
        ))}
      </Flex>
      <NavIconLink />
    </Flex>
  );
};

export default NavigationBar;
