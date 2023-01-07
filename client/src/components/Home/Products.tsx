import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const ContainerStyle = {
  direction: "row",
  shadow: "box",
  backgroundColor: "white",
  padding: "8",
};

const Products = () => {
  return (
    <Flex direction="row" justifyContent="center" px={8} gap="16px">
      <Flex direction="column" gap="16px" width="50%">
        <Flex sx={ContainerStyle}>
          <Box width="70%">
            <Text color="#b8b8b8">#Accessories</Text>
            <Heading as="h5" size="h5">
              Discover Our Accecories Collection
            </Heading>
          </Box>
          <Image
            src="images/t-shirt 3.png"
            alt="Demon Slayer"
            height="120px"
            width="auto"
          />
        </Flex>
        <Flex sx={ContainerStyle}>
          <Box width="70%">
            <Text color="#b8b8b8">#Mask</Text>
            <Heading as="h5" size="h5">
              Make Your Masks More Comfortable
            </Heading>
          </Box>
          <Image
            src="images/mask.png"
            alt="Demon Slayer"
            height="120px"
            width="auto"
          />
        </Flex>
      </Flex>
      <Flex sx={ContainerStyle} width="50%">
        <Box width="50%">
          <Text color="#b8b8b8">#Clothes</Text>
          <Heading as="h5" size="h5">
            Express your Life through our Apparels
          </Heading>
        </Box>
        <Image
          src="images/t-shirt 3.png"
          alt="Demon Slayer"
          height="300px"
          width="auto"
        />
      </Flex>
    </Flex>
  );
};

export default Products;
