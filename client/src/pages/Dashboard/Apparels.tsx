import { Box, Flex } from "@chakra-ui/react";
import FilterBar from "../../components/FilterBar.tsx";

const Apparels = () => {
  return (
    <Flex direction="row">
      <FilterBar />
      <Box>Hello</Box>
    </Flex>
  );
};

export default Apparels;
