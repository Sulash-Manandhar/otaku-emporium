import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import ProductLayout from "../Product";

const TopProducts = () => {
  return (
    <Box px="8">
      <Heading
        size="h3"
        as="h3"
        textAlign="center"
        my="8"
        backgroundColor="green.400"
        color="white"
      >
        Top Pick of the Week
      </Heading>
      <Grid
        gridTemplateColumns={[
          "repeat(2,minmax(0, 1fr))",
          "repeat(4,minmax(0, 1fr))",
        ]}
        gap="8px"
      >
        <GridItem>
          <ProductLayout
            name="EchiHoodie"
            price={999}
            imageUrl="images/EchiHoddie.png"
          />
        </GridItem>

        <GridItem>
          <ProductLayout
            name="EchiHoodie"
            price={999}
            imageUrl="images/EchiHoddie.png"
          />
        </GridItem>
        <GridItem>
          <ProductLayout
            name="EchiHoodie"
            price={999}
            imageUrl="images/EchiHoddie.png"
          />
        </GridItem>
        <GridItem>
          <ProductLayout
            name="EchiHoodie"
            price={999}
            imageUrl="images/EchiHoddie.png"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TopProducts;
