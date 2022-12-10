import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Searchbar from "./Searchbar";
import { GiLaurelCrown } from "react-icons/gi";

const Header = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bgColor="gray.400"
      px={8}
      py={2}
    >
      <Flex alignItems="center" gap="8px" color="green.400">
        <GiLaurelCrown fontSize={32} />
        <Heading size="h4">Otaku Emporium</Heading>
      </Flex>
      <Searchbar />
    </Flex>
  );
};

export default Header;
