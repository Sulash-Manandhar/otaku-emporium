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
import {
  localUserInfoSchema,
  loginMutateDataSchema,
} from "../../../Schema/common";
import { useRef } from "react";

interface Props {
  user: localUserInfoSchema;
  handleCreateAccountNavigation: () => void;
  handleForgotPasswordNavigation: () => void;
  errorMessage: string;
  closeErrorMessage: () => void;
  handleLogin: (params: loginMutateDataSchema) => void;
}

const PasswordLoginModal: React.FC<Props> = (props) => {
  const {
    user,
    handleForgotPasswordNavigation,
    handleCreateAccountNavigation,
    errorMessage,
    closeErrorMessage,
    handleLogin,
  } = props;

  const passwordRef = useRef<any>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleLogin({
      email: user.email,
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
          src={user?.url}
          mt="-15%"
          ml="10px"
        />
        <Heading mt="20px">{user.name}</Heading>
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
                placeholder="Enter Password"
                w="80%"
                type="password"
                autoFocus
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

          <Box>
            <Flex>
              <Text>Not you? &nbsp;</Text>
              <Link
                fontWeight="bold"
                color="green.500"
                onClick={handleForgotPasswordNavigation}
              >
                Login with another account
              </Link>
            </Flex>
          </Box>

          <Box>
            <Divider w="80%" mb={2} color="red" />
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

export default PasswordLoginModal;
