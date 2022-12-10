import { Badge, Box, Flex, List, ListIcon, ListItem } from "@chakra-ui/react";
import Spacer from "../Utils";
import { NavLink } from "react-router-dom";
import { AUTH_LINK, PUBLIC_LINK } from "../../constant/link";
import { linkDetail } from "../../Schema/link.schema";

const Footer = () => {
  return (
    <Box mt="8px">
      <Spacer background="green.400" />
      <Flex justifyContent="flex-start" px={8} py={4} gap={32}>
        <Box>
          <Badge colorScheme="blue">Pages</Badge>
          <List color="gray.600">
            {PUBLIC_LINK.map((item: linkDetail) => (
              <NavLink to={item.path} key={item.id}>
                <ListItem>
                  <ListIcon as={item.icon} />
                  {item.name}
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
        <Box>
          <Badge colorScheme="green">Features</Badge>
          <List color="gray.600">
            {AUTH_LINK.map((item: linkDetail) => (
              <NavLink to={item.path} key={item.id}>
                <ListItem>
                  <ListIcon as={item.icon} />
                  {item.name}
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
        <Box>Favourite</Box>
      </Flex>
    </Box>
  );
};

export default Footer;
