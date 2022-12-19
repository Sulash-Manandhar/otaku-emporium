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
import { useNavigate } from "react-router-dom";
import urls from "../../../routes/urls";
import { localUserInfoSchema } from "../../../Schema/common";

interface Props {
  user: localUserInfoSchema;
  handleCreateAccountNavigation: () => void;
  handleForgotPasswordNavigation: () => void;
}

const PasswordLoginModal: React.FC<Props> = (props) => {
  const {
    user,
    handleForgotPasswordNavigation,
    handleCreateAccountNavigation,
  } = props;

  const navigate = useNavigate();

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
        <Flex direction="column" gap="8" alignItems="center">
          <Input
            variant="flushed"
            placeholder="Enter Password"
            w="80%"
            type="password"
            autoFocus
          />
          <Button type="button" variant="solid" colorScheme="linkedin">
            Login
          </Button>

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
