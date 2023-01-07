import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { BsTruck } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { IoShirtOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";

interface ServiceDetailProps {
  icon: IconType;
  title: string;
  description: string;
}

const SERVICE_LIST = [
  {
    id: 1,
    icon: BsTruck,
    title: "Free Shipping",
    description:
      "Free shipping to all over the world with many specials only for our dear customers",
  },
  {
    id: 2,
    icon: IoShirtOutline,
    title: "Quality Product",
    description:
      "Many customers entrust various furnitures needs to us, and Customer satisfaction is our pride",
  },
  {
    id: 3,
    icon: GiReturnArrow,
    title: "Easy Return",
    description:
      "Many customers felt easy to return their purchased product if not satisfied.",
  },
];

const ServiceDetail = (props: ServiceDetailProps) => {
  const { icon, title, description } = props;
  return (
    <Flex
      direction="column"
      p="4"
      shadow="box"
      backgroundColor="white"
      w="100%"
      h="100%"
    >
      <Icon as={icon} fontSize="40" />
      <Heading as="h5" size="h4">
        {title}
      </Heading>
      <Text>{description}</Text>
    </Flex>
  );
};

const Service = () => {
  return (
    <Box px={8}>
      <Box textAlign="center" my={8}>
        <Heading as="h3" size="h3">
          Services We Provide
        </Heading>
      </Box>
      <Grid templateColumns={["repeat(1,1fr)", "repeat(3,1fr)"]} gap="16px">
        {SERVICE_LIST.map((item) => (
          <GridItem key={item.id}>
            <ServiceDetail
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Service;
