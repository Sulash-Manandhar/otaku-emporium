import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationMenu = () => {
  const navigate = useNavigate();
  return (
    <Box py="8px" backgroundColor="black.400" color="white">
      <Box
        display="inline-block"
        fontSize="18px"
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
        <Box p="8px 16px 8px 8px" onClick={() => navigate("/")}>
          <Text>Home</Text>
        </Box>
        <Box p="8px 16px 8px 8px" onClick={() => navigate("/apparels")}>
          <Text>Apparels</Text>
        </Box>
        <Box p="8px 16px 8px 8px" onClick={() => navigate("user/favorites")}>
          <Text>My Favorites</Text>
        </Box>
        <Box p="8px 16px 8px 8px" onClick={() => navigate("user/profile")}>
          <Text>My Profile</Text>
        </Box>
        <Box p="8px 16px 8px 8px" onClick={() => navigate("/login")}>
          <Text>Sign Up/Login</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default NavigationMenu;
