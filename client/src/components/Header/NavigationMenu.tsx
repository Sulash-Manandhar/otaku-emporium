import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationMenu = () => {
  const navigate = useNavigate();
  return (
    <Box py="8px" backgroundColor="black.400" color="white">
      <Box
        display="inline-block"
        sx={{
          " & > *": {
            _hover: {
              cursor: "pointer",
              backgroundColor: "red.400",
              clipPath: "polygon(0 0, 100% 0%, 90% 100%, 0% 100%)",
            },
          },
        }}
      >
        <Box p="8px 16px 8px 8px">
          <Heading as="h4" variant="h4" onClick={() => navigate("/")}>
            Home
          </Heading>
        </Box>
        <Box p="8px 16px 8px 8px">
          <Heading as="h4" variant="h4" onClick={() => navigate("/apparels")}>
            Apparels
          </Heading>
        </Box>
        <Box p="8px 16px 8px 8px" onClick={() => navigate("user/favorites")}>
          <Heading as="h4" variant="h4">
            My Favorites
          </Heading>
        </Box>
        <Box p="8px 16px 8px 8px" onClick={() => navigate("user/profile")}>
          <Heading as="h4" variant="h4">
            My Profile
          </Heading>
        </Box>
        <Box p="8px 16px 8px 8px" onClick={() => navigate("/login")}>
          <Heading as="h4" variant="h4">
            Sign Up/Login
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default NavigationMenu;
