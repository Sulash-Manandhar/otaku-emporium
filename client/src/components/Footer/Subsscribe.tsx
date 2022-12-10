import {
  Flex,
  FormControl,
  Input,
  Button,
  FormHelperText,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";

const Subsscribe = () => {
  return (
    <Flex direction="column" justifyContent="flex-start" gap="4">
      <Box>
        <Text fontSize={["md", "xl"]}>Subscribe to our newsletters</Text>
        <Text fontSize={["sm", "md"]} color="gray.500">
          Monthly digest of whats new and exciting from us.
        </Text>
      </Box>
      <FormControl>
        <Flex gap={4}>
          <Input type="email" placeholder="Email Address" size={["sm", "md"]} />
          <Button colorScheme="blue" size={["sm", "md"]}>
            Subscribe
          </Button>
        </Flex>
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </Flex>
  );
};

export default Subsscribe;
