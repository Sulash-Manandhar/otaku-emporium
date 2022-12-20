import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Grid w="100vw" h="100vh" placeItems="center">
      <GridItem>
        <Spinner size="xl" thickness="5px" />
      </GridItem>
    </Grid>
  );
};

export default Loading;
