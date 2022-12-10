import { Flex, Badge, List, ListItem, ListIcon, Box } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { PUBLIC_LINK, AUTH_LINK, SOCIAL_LINK } from "../../constant/link";
import { linkDetail } from "../../Schema/link.schema";

const NavFooter = () => {
  return (
    <Flex justifyContent="flex-start" gap={32}>
      <Box>
        <Badge colorScheme="blue">Pages</Badge>
        <List color="gray.600">
          {PUBLIC_LINK.map((item: linkDetail) => (
            <NavLink to={item.path} key={item.id}>
              <ListItem
                _hover={{
                  color: "blue.600",
                }}
              >
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
              <ListItem
                _hover={{
                  color: "green.600",
                }}
              >
                <ListIcon as={item.icon} />
                {item.name}
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Box>
      <Box>
        <Badge colorScheme="orange">Social</Badge>
        <List color="gray.600">
          {SOCIAL_LINK.map((item: linkDetail) => (
            <a href={item.path} key={item.id}>
              <ListItem
                _hover={{
                  color: "orange.400",
                }}
              >
                <ListIcon as={item.icon} />
                {item.name}
              </ListItem>
            </a>
          ))}
        </List>
      </Box>
    </Flex>
  );
};

export default NavFooter;
