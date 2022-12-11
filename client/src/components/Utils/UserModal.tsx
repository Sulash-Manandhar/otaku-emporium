import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserModalContext } from "../../context/UserModalProvider";
import urls from "../../routes/urls";
import { getAccessToken } from "../../utils/auth";

const UserModal = () => {
  const { isUserModalOpen, setIsUserModalOpen } = useUserModalContext();
  const navigate = useNavigate();

  const access_token = getAccessToken();

  const handleOnClose = () => {
    setIsUserModalOpen(false);
  };

  const handleCreateAccountNavigation = () => {
    navigate(urls.sign_in);
    handleOnClose();
  };

  const handleForgotPasswordNavigation = () => {
    navigate(urls.forgot_password);
    handleOnClose();
  };

  return (
    <Modal
      isOpen={isUserModalOpen}
      onClose={handleOnClose}
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Avatar
            size="2xl"
            name="Prosper Otemuyiwa"
            src="https://bit.ly/prosper-baba"
            mt="-15%"
            ml="10px"
          />
          <Heading mt="20px">Mari Doe</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Flex direction="column" gap="8" alignItems="center">
            <Input
              variant="flushed"
              placeholder="Enter Password"
              w="80%"
              autoFocus
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

            <Box pb="5px">
              <Divider w="80%" mb={4} color="red" />
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
    </Modal>
  );
};

export default UserModal;
