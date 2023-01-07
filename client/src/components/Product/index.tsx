import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  name: string;
  price: number;
  imageUrl: string;
}

const ProductLayout: React.FC<Props> = (props) => {
  const { name, price, imageUrl } = props;
  return (
    <Box
      shadow="box"
      padding={["8px", "16px"]}
      fontSize={["10px", "18px"]}
      cursor="pointer"
    >
      <Image src={imageUrl} alt="name" width="100%" height="auto" />
      <Text as="p">{name}</Text>
      <Flex flexDirection="row" justifyContent="space-between">
        <Text as="span">{price}/-</Text>
        <Text as="span">Nepal</Text>
      </Flex>
    </Box>
  );
};

export default ProductLayout;
