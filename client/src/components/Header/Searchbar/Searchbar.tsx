import { Flex, Input, IconButton, Box } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  return (
    <Flex>
      <Box
        p="8px"
        backgroundColor="red.400"
        _hover={{
          backgroundColor: "red.500",
        }}
        clipPath=" polygon(10% 0, 100% 0, 100% 100%, 0% 100%)"
      >
        <Flex ml="24px">
          {isSearchBarOpen && (
            <Input
              type="text"
              variant="unstyled"
              size="sm"
              borderBottom="1px solid"
              borderColor="white"
              color="white"
            />
          )}
          <IconButton
            aria-label="Search"
            fontSize="32px"
            variant="link"
            color="white"
            animation=" rotate-center 0.9s ease-in-out both"
            onClick={() => setIsSearchBarOpen((prev) => !prev)}
            icon={isSearchBarOpen ? <AiOutlineClose /> : <AiOutlineSearch />}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default SearchBar;
