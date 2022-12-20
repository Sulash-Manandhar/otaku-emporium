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
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";
import { loginMutateDataSchema } from "../../../Schema/common";
import { useRef } from "react";

interface Props {
  handleCreateAccountNavigation: () => void;
  handleForgotPasswordNavigation: () => void;
  errorMessage: string;
  closeErrorMessage: () => void;
  handleLogin: (params: loginMutateDataSchema) => void;
}

const LoginModal: React.FC<Props> = (props) => {
  const {
    handleCreateAccountNavigation,
    handleForgotPasswordNavigation,
    errorMessage,
    closeErrorMessage,
    handleLogin,
  } = props;

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleLogin({
      email: emailRef.current?.value,
      password: passwordRef.current.value,
      remember: true,
    });
  };

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
        {errorMessage.length > 0 && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <Box w="100%">{errorMessage}</Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={0}
              top={0}
              onClick={closeErrorMessage}
            />
          </Alert>
        )}
        <Flex direction="column" gap="8" alignItems="center">
          <form style={{ width: "100%" }}>
            <Flex direction="column" gap="8" alignItems="center">
              <Input
                variant="flushed"
                type="email"
                ref={emailRef}
                placeholder="Enter Email Address"
                w="80%"
                autoFocus
              />
              <Input
                variant="flushed"
                type="password"
                placeholder="Enter Password"
                w="80%"
                ref={passwordRef}
              />
              <Button
                type="button"
                variant="solid"
                colorScheme="linkedin"
                onClick={onSubmit}
              >
                Login
              </Button>
            </Flex>
          </form>
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
