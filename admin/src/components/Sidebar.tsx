import {
  Flex,
  Tooltip,
  IconButton,
  useDisclosure,
  Button,
  List,
  ListItem,
  ListIcon,
  SystemStyleObject,
  Icon,
  Text,
} from "@chakra-ui/react";
import { SidebarNavData } from "@src/data/SidebarData";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

interface Props {
  logout: () => void;
}

const ListItemStlye: SystemStyleObject = {
  display: "flex",
  alignItems: "center",
  p: 4,
  w: "100%",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
  borderBottom: "1px solid white",
  _hover: {
    backgroundColor: "blackAlpha.700",
  },
};

const Sidebar: React.FC<Props> = (props) => {
  const { logout } = props;
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      h="100%"
      w="fit-content"
      backgroundColor="blackAlpha.800"
      color="white"
      overflowY="auto"
      className="hide-scroll"
      transition="width 0.5s ease"
    >
      <Flex flexDir="column" alignItems="center" w="100%">
        {SidebarNavData.map((item) => (
          <Tooltip label={item.name} placement="right" hasArrow key={item.id}>
            <NavLink to={item.path} style={{ width: "100%" }}>
              <Flex sx={ListItemStlye}>
                <Icon as={item.icon} fontSize="1.3rem" />
                {isOpen && (
                  <Text as="span" ml="2">
                    {item.name}
                  </Text>
                )}
              </Flex>
            </NavLink>
          </Tooltip>
        ))}
      </Flex>
      <Flex flexDir="column" alignItems="center" w="100%">
        <Tooltip label="Expand" placement="right" hasArrow>
          <Flex
            sx={ListItemStlye}
            borderTop="1px solid white"
            onClick={onToggle}
          >
            <Icon as={TbLayoutSidebarLeftExpand} fontSize="1.3rem" />
            {isOpen && (
              <Text as="span" ml="2">
                {isOpen ? "Collapse" : "Expand"}
              </Text>
            )}
          </Flex>
        </Tooltip>
        <Tooltip label="Logout" placement="right" hasArrow>
          <Flex sx={ListItemStlye} borderTop="1px solid white" onClick={logout}>
            <Icon as={AiOutlineLogout} fontSize="1.3rem" />
            {isOpen && (
              <Text as="span" ml="2">
                Logout
              </Text>
            )}
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
