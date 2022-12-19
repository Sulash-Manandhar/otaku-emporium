import {
  ModalContent,
  ModalHeader,
  Avatar,
  Heading,
  ModalCloseButton,
  ModalBody,
  Flex,
  Input,
  Button,
  Divider,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  handleCreateAccountNavigation: () => void;
  handleForgotPasswordNavigation: () => void;
}

const LoginModal: React.FC<Props> = (props) => {
  const { handleCreateAccountNavigation, handleForgotPasswordNavigation } =
    props;

  return (
    <ModalContent>
      <ModalHeader textAlign="center">
        <Avatar
          size="2xl"
          name="Prosper Otemuyiwa"
          src="/images/avatar.svg"
          mt="-15%"
          ml="10px"
        />
        <Heading mt="20px">Login</Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody textAlign="center">
        <Flex direction="column" gap="8" alignItems="center">
          <Input
            variant="flushed"
            type="email"
            placeholder="Enter Email Address"
            w="80%"
            autoFocus
          />
          <Input
            variant="flushed"
            type="password"
            placeholder="Enter Password"
            w="80%"
          />
          <Button type="button" variant="solid" colorScheme="linkedin">
            Login
          </Button>
          <Button
            type="button"
            variant="link"
            onClick={handleForgotPasswordNavigation}
          >
            Forgot Password?
          </Button>
          <Box>
            <Divider w="80%" mb={2} />
            <Flex>
              <Text>Don't have an account? &nbsp;</Text>
              <Link
                fontWeight="bold"
                color="green.500"
                onClick={handleCreateAccountNavigation}
              >
                Create One
              </Link>
            </Flex>
          </Box>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default LoginModal;
