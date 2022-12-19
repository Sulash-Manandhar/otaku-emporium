import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../../routes/urls";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  contentHeader: string;
  contentBody: string;
  loadingMsg?: string;
  buttonMsg: string;
  url: string;
}

const NavigationModal: React.FC<Props> = (props) => {
  const {
    isOpen,
    onClose,
    isLoading,
    contentBody,
    contentHeader,
    loadingMsg,
    buttonMsg,
    url,
  } = props;

  const cancelRef = useRef<any>();
  const navigate = useNavigate();

  const handleNavigationToVerifyCode = () => {
    navigate(url);
    onClose();
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={handleNavigationToVerifyCode}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{contentHeader}</AlertDialogHeader>
        <AlertDialogBody>{contentBody}</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ml={3}
            isLoading={isLoading}
            loadingText={loadingMsg}
            onClick={handleNavigationToVerifyCode}
            colorScheme="linkedin"
          >
            {buttonMsg}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NavigationModal;
