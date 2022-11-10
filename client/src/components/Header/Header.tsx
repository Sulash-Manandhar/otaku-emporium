import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GiLaurelCrown } from "react-icons/gi";
import Searchbar from "./Searchbar/Searchbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavigationMenu from "./NavigationMenu";

const Header = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Box>
      <Flex justifyContent="space-between" backgroundColor="black.400">
        {/* Menu Button and Home button  */}
        <Flex>
          <Box
            p="8px"
            clipPath="polygon(0 0, 100% 0%, 60% 100%, 0% 100%)"
            backgroundColor="black.400"
          >
            <Box mr="24px" onClick={() => setIsNavOpen((prev) => !prev)}>
              <IconButton
                aria-label="menu-icon"
                variant="unstyled"
                fontSize="24px"
                color="white"
                icon={isNavOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              />
            </Box>
          </Box>
          <Box
            backgroundColor="red.400"
            p="8px"
            clipPath=" polygon(15% 0, 100% 0%, 100% 100%, 0% 100%)"
            _hover={{
              backgroundColor: "red.500",
            }}
          >
            <Flex
              ml="32px"
              color="white"
              alignItems="center"
              gap="16px"
              onClick={() => navigate("/")}
            >
              <GiLaurelCrown fontSize="32px" />
              <Heading as="h4" variant="h4" fontWeight="500">
                Otaku Emporium
              </Heading>
            </Flex>
          </Box>
        </Flex>
        {/* Search Botton  */}
        <Searchbar />
      </Flex>
      {/* SubMenu */}
      {isNavOpen && <NavigationMenu />}
    </Box>
  );
};

export default Header;
