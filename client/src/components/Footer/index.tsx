import { Box, Flex } from "@chakra-ui/react";
import Spacer from "../Utils/Spacer";
import FooterDescription from "./FooterDescription";
import NavFooter from "./NavFooter";
import Subsscribe from "./Subsscribe";

const Footer = () => {
  return (
    <Box mt="8px">
      <Spacer background="green.400" />
      <Box px={8}>
        <Flex
          justifyContent="space-between"
          py={4}
          direction={["column", "row"]}
          gap={[10, "auto"]}
        >
          <NavFooter />
          <Subsscribe />
        </Flex>
        <FooterDescription />
      </Box>
    </Box>
  );
};

export default Footer;
