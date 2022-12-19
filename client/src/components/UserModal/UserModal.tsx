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
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUserModalContext } from "../../context/UserModalProvider";
import urls from "../../routes/urls";
import {
  getUserInfo,
  setAccessToken,
  setRefreshToken,
  setUserInfo,
} from "../../utils/auth";
import { loginAPI } from "../../utils/requestApi";
import LoginModal from "./SubModal/LoginModal";
import PasswordLoginModal from "./SubModal/PasswordLoginModal";

const UserModal = () => {
  const { isUserModalOpen, setIsUserModalOpen } = useUserModalContext();
  const navigate = useNavigate();

  const toast = useToast({
    isClosable: true,
    duration: 3000,
    position: "bottom",
  });
  const user = getUserInfo();
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

  const loginQuery = useMutation((data: any) => loginAPI(data), {
    onSuccess: (res) => {
      toast({
        title: "You are successfully logged in.",
        status: "success",
      });
      if (res?.data?.access_token) {
        setAccessToken(res?.data?.access_token);
        setRefreshToken(res?.data?.refresh_token);
        setUserInfo(JSON.stringify(res?.data?.user));
        window.location.reload();
      }
    },
    onError: (err: any) => {
      if (err?.response?.status === 403) {
        // onOpen();
        toast({
          title: err?.response?.data?.msg,
          status: "info",
        });

        // setUserId(err?.response?.data?.data?.user?.id);
      } else {
        // setErrorMessage(err?.response?.data?.msg);
      }
    },
  });

  return (
    <Modal
      isOpen={isUserModalOpen}
      onClose={handleOnClose}
      preserveScrollBarGap
    >
      <ModalOverlay />
      {false ? (
        <PasswordLoginModal
          user={user}
          handleForgotPasswordNavigation={handleForgotPasswordNavigation}
          handleCreateAccountNavigation={handleCreateAccountNavigation}
        />
      ) : (
        <LoginModal
          handleForgotPasswordNavigation={handleForgotPasswordNavigation}
          handleCreateAccountNavigation={handleCreateAccountNavigation}
        />
      )}
    </Modal>
  );
};

export default UserModal;
