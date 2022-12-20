import {
  Box,
  Modal,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUserModalContext } from "../../context/UserModalProvider";
import urls from "../../routes/urls";
import { loginMutateDataSchema } from "../../Schema/common";
import {
  getUserInfo,
  setAccessToken,
  setRefreshToken,
  setUserInfo,
} from "../../utils/auth";
import { loginAPI } from "../../utils/requestApi";
import NavigationModal from "../signup/NavigationModal";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");

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

  const closeErrorMessage = () => {
    setErrorMessage("");
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
        handleOnClose();
        setUserId(err?.response?.data?.data?.user?.id);
        closeErrorMessage();
        onOpen();
      } else {
        setErrorMessage(err?.response?.data?.msg);
      }
    },
  });

  const handleLogin = (data: loginMutateDataSchema) => {
    loginQuery.mutate(data);
  };

  return (
    <Box>
      <NavigationModal
        isOpen={isOpen}
        onClose={onClose}
        contentHeader="Verify your email address now!"
        contentBody="You need to verify your email to login"
        buttonMsg="Verify Email"
        url={urls.verify_email.replace(":id", userId)}
      />
      <Modal
        isOpen={isUserModalOpen}
        onClose={handleOnClose}
        preserveScrollBarGap
      >
        <ModalOverlay />
        {user ? (
          <PasswordLoginModal
            user={user}
            handleLogin={handleLogin}
            errorMessage={errorMessage}
            closeErrorMessage={closeErrorMessage}
            handleForgotPasswordNavigation={handleForgotPasswordNavigation}
            handleCreateAccountNavigation={handleCreateAccountNavigation}
          />
        ) : (
          <LoginModal
            handleLogin={handleLogin}
            errorMessage={errorMessage}
            closeErrorMessage={closeErrorMessage}
            handleForgotPasswordNavigation={handleForgotPasswordNavigation}
            handleCreateAccountNavigation={handleCreateAccountNavigation}
          />
        )}
      </Modal>
    </Box>
  );
};

export default UserModal;
