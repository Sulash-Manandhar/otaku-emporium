import { Flex, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  return (
    <Flex
      p="8px"
      alignItems="center"
      backgroundColor="red.400"
      _hover={{
        backgroundColor: "red.500",
      }}
      clipPath=" polygon(10% 0, 100% 0, 100% 100%, 0% 100%)"
    >
      <Flex ml="24px" flexDir="row">
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
          fontSize="24px"
          variant="link"
          color="white"
          onClick={() => setIsSearchBarOpen((prev) => !prev)}
          icon={isSearchBarOpen ? <AiOutlineClose /> : <AiOutlineSearch />}
        />
      </Flex>
    </Flex>
  );
};

export default SearchBar;
