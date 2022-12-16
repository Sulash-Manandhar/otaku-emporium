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
  user: any;
}

const NavigationModal: React.FC<Props> = (props) => {
  const { isOpen, onClose, user } = props;

  const cancelRef = useRef<any>();
  const navigate = useNavigate();

  const handleNavigationToVerifyCode = () => {
    if (user) {
      navigate(urls.verify_opt.replace(":id", user.id));
    }
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
        <AlertDialogHeader>
          Verification Code (OPT) has been sent to your email address.
        </AlertDialogHeader>
        <AlertDialogBody>
          You will be navigated to verify code page.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ml={3}
            onClick={handleNavigationToVerifyCode}
            colorScheme="linkedin"
          >
            Verify OPT Code
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NavigationModal;
