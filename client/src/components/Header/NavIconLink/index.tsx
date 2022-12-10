import { Flex, Tooltip, Avatar, Circle, Badge } from "@chakra-ui/react";
import React from "react";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";

const NavIconLink = () => {
  return (
    <Flex justifyContent="flex-start" alignItems="center" gap="8px">
      <Tooltip label="Profile" hasArrow>
        <Avatar
          size="sm"
          name="Sulash Manandhar"
          src="https://bit.ly/dan-abramov"
        />
      </Tooltip>
      <Tooltip label="Cart" hasArrow>
        <Circle size="35px" bg="telegram.500" color="white" position="relative">
          <Badge
            position="absolute"
            top={-1}
            right={-1}
            variant="subtle"
            colorScheme="linkedin"
            fontSize="10px"
            borderRadius="lg"
          >
            99
          </Badge>
          <AiOutlineShoppingCart />
        </Circle>
      </Tooltip>
      <Circle size="35px" bg="red.500" color="white" position="relative">
        <AiOutlineHeart />
      </Circle>
    </Flex>
  );
};

export default NavIconLink;
