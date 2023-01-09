import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Products from "../../components/Home/Products";
import Service from "../../components/Home/Service";
import TopProducts from "../../components/Home/TopProducts";

const Home = () => {
  return (
    <Flex direction="column" gap="16" color="#252525">
      <Heading as="h1" variant="h1">
        <Box>
          <Image src="images/slide2.jpg" alt="Hero Image" w="100%" />
        </Box>
      </Heading>
      <TopProducts />
      <Service />
      <Products />
    </Flex>
  );
};

export default Home;
