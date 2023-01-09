import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  name: string;
  price: number;
  imageUrl: string;
}

const ProductLayout: React.FC<Props> = (props) => {
  const { name, price, imageUrl } = props;

  const getPrice = (price: number) => {
    return `Rs.${price}/-`;
  };

  return (
    <Box
      w="100%"
      height="100%"
      fontSize={["10px", "18px"]}
      cursor="pointer"
      shadow="card"
      _hover={{
        shadow: "box",
      }}
    >
      <Image src={imageUrl} alt="name" width="100%" height="auto" />
      <Box padding={["8px", "16px"]}>
        <Text fontSize="20px" color="gray.500">
          Otaku Emporium
        </Text>
        <Tooltip label={name} placement="top" openDelay={1000} hasArrow>
          <Text
            as="p"
            w="100%"
            noOfLines={2}
            fontSize="18px"
            width="max-content"
            textTransform="initial"
          >
            {name}
          </Text>
        </Tooltip>
        <Box mt={4}>
          <Text fontSize="30px">{getPrice(price)}</Text>
          <Text color="gray.500" fontSize="18px" textAlign="right">
            Nepal
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductLayout;
