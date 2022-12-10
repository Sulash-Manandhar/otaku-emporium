import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import Spacer from "../Utils";
import FooterDescription from "./FooterDescription";
import NavFooter from "./NavFooter";
import Subsscribe from "./Subsscribe";

const Footer = () => {
  return (
    <Box mt="8px">
      <Spacer background="green.400" />
      <Box px={8}>
        <Flex justifyContent="space-between" py={4}>
          <NavFooter />
          <Subsscribe />
        </Flex>
        <FooterDescription />
      </Box>
    </Box>
  );
};

export default Footer;
