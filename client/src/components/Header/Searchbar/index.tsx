import {
  InputGroup,
  Input,
  InputRightAddon,
  Box,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = () => {
  return (
    <Box w="30%">
      <InputGroup size="sm">
        <Input
          placeholder="Search.."
          variant="filled"
          backgroundColor="White"
        />
        <InputRightAddon
          children={<AiOutlineSearch />}
          backgroundColor="teal.400"
          color="white"
          fontSize={18}
          _hover={{
            cursor: "pointer",
          }}
        />
      </InputGroup>
    </Box>
  );
};

export default Searchbar;
