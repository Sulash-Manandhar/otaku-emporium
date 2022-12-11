import { Spinner, Grid, Box, Text, Image } from "@chakra-ui/react";
import React from "react";

const DataLoading = () => {
  return (
    <Grid w="100wh" h="100vh" placeItems="center">
      <Box textAlign="center">
        <Image alt="Work In Progress" src="/images/Loading.svg" w="50%" />
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text fontWeight="bold" fontSize="2xl" mt="5" fontFamily="garamond">
          Work in progress...
        </Text>
      </Box>
    </Grid>
  );
};

export default DataLoading;
