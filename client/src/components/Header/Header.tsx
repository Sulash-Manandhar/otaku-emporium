import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GiLaurelCrown } from "react-icons/gi";
import Searchbar from "./Searchbar/Searchbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavigationMenu from "./NavigationMenu";
import { iconPadding, iconSize } from "../../constant/style";

const Header = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        backgroundColor="black.400"
        pl="16px"
      >
        {/* Menu Button and Home button  */}
        <Flex alignItems="center">
          <Box
            p={iconPadding}
            clipPath="polygon(0 0, 100% 0%, 60% 100%, 0% 100%)"
            backgroundColor="black.400"
            width={["30px", "auto"]}
          >
            <Icon
              aria-label="menu-icon"
              fontSize={iconSize}
              color="white"
              onClick={() => setIsNavOpen((prev) => !prev)}
              as={isNavOpen ? AiOutlineClose : AiOutlineMenu}
            />
          </Box>

          <Box
            backgroundColor="red.400"
            p={iconPadding}
            width={["230px", "auto"]}
            clipPath=" polygon(15% 0, 100% 0%, 100% 100%, 0% 100%)"
            _hover={{
              backgroundColor: "red.500",
            }}
            display={[isSearchBarOpen ? "none" : "block", "block"]}
          >
            <Flex
              ml="32px"
              color="white"
              alignItems="center"
              gap="16px"
              onClick={() => navigate("/")}
            >
              <Icon as={GiLaurelCrown} fontSize={iconSize} />
              <Heading size="h4" fontWeight="500">
                Otaku Emporium
              </Heading>
            </Flex>
          </Box>
        </Flex>
        {/* Search Botton  */}
        <Searchbar
          isSearchBarOpen={isSearchBarOpen}
          setIsSearchBarOpen={setIsSearchBarOpen}
        />
      </Flex>
      {/* SubMenu */}
      {isNavOpen && <NavigationMenu />}
    </Box>
  );
};

export default Header;
