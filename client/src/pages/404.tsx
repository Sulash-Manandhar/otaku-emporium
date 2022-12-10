import { Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import urls from "../constant/urls";

const PageNotFound = () => {
  return (
    <Grid placeItems="center" h="100vh" w="100wh">
      <Flex direction="column" alignItems="center" gap={8}>
        <Image alt="Page not found(404)" src="./images/404.svg" w="50%" />
        <Text fontWeight="bold" fontSize="2xl">
          Page Not Found
        </Text>
        <NavLink to={urls.home}>
          <Button variant="link" fontSize="18px">
            <Flex gap={2}>
              <AiTwotoneHome /> Go to HomePage
            </Flex>
          </Button>
        </NavLink>
      </Flex>
    </Grid>
  );
};

export default PageNotFound;
