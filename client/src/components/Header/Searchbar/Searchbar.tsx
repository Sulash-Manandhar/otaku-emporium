import { Flex, Input, IconButton, Box, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { iconSize, iconPadding } from "../../../constant/style";

type Props = {
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: any;
};

const SearchBar = (props: Props) => {
  const { isSearchBarOpen, setIsSearchBarOpen } = props;

  return (
    <Flex
      backgroundColor="red.400"
      flex={isSearchBarOpen ? "auto" : "1fr"}
      _hover={{
        backgroundColor: "red.500",
      }}
      clipPath={[
        "polygon(11% 0, 100% 0, 100% 100%, 0% 100%)",
        "polygon(5% 0, 100% 0, 100% 100%, 0% 100%)",
      ]}
      p={iconPadding}
      justifyContent="flex-end"
      w={["50px", "auto"]}
    >
      <Flex
        ml={["0px", "24px"]}
        w="80%"
        justifyContent="flex-end"
        gap="8px"
        alignItems="center"
      >
        {isSearchBarOpen && (
          <Input
            type="text"
            variant="flushed"
            size={["sm", "md"]}
            color="white"
            autoFocus={true}
          />
        )}
        <Icon
          aria-label="Search"
          fontSize={iconSize}
          color="white"
          as={isSearchBarOpen ? AiOutlineClose : AiOutlineSearch}
          onClick={() => setIsSearchBarOpen((prev: boolean) => !prev)}
        />
      </Flex>
    </Flex>
  );
};

export default SearchBar;
