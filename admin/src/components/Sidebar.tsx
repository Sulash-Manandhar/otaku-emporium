import { Flex, Tooltip, IconButton } from "@chakra-ui/react";
import { SidebarData } from "@src/data/SidebarData";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const IconButtonStlye = {
  fontSize: "1.5rem",
  padding: "1rem",
  variant: "link",
  color: "white",
  _hover: {
    backgroundColor: "blackAlpha.700",
  },
};
interface Props {
  logout: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const { logout } = props;
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      h="100%"
      backgroundColor="blackAlpha.800"
      color="white"
      overflowY="auto"
      className="hide-scroll"
    >
      <Flex flexDir="column" padding="0.275rem" justifyContent="center">
        {SidebarData.map((item) => {
          let Icon: any = item.icon;
          return (
            <Tooltip
              label={item.name}
              fontSize="sm"
              hasArrow
              placement="right"
              key={item.id}
            >
              <NavLink to={item.path}>
                <IconButton
                  variant="link"
                  aria-label="Logout"
                  icon={<Icon />}
                  sx={IconButtonStlye}
                />
              </NavLink>
            </Tooltip>
          );
        })}
      </Flex>
      <Flex justifyContent="center" padding="0.275rem">
        <Tooltip label="Logout" fontSize="sm" hasArrow placement="right">
          <IconButton
            aria-label="Logout"
            icon={<BiLogOut />}
            variant="link"
            onClick={logout}
            sx={IconButtonStlye}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
