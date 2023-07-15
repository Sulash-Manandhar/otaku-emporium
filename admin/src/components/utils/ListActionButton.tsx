import {
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { UseMutationResult } from "@tanstack/react-query";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  viewPath: string;
  editPath: string;
  deleteMutation: UseMutationResult<any, unknown, void, unknown>;
}

const ListActionButton: React.FC<Props> = (props) => {
  const { viewPath, editPath, deleteMutation } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("viewPath", viewPath);
  return (
    <ButtonGroup>
      <Tooltip label="View" hasArrow placement="bottom">
        <IconButton
          icon={<AiFillEye />}
          aria-label="View"
          variant="ghost"
          colorScheme="blue"
          onClick={() => navigate(viewPath)}
        />
      </Tooltip>
      <Tooltip label="Edit" hasArrow placement="bottom">
        <IconButton
          icon={<AiFillEdit />}
          aria-label="Edit"
          variant="ghost"
          colorScheme="green"
          onClick={() => navigate(editPath)}
        />
      </Tooltip>
      <Tooltip label="Delete" hasArrow placement="bottom">
        <IconButton
          icon={<AiFillDelete />}
          aria-label="Delete"
          variant="ghost"
          colorScheme="red"
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete {pathname.slice(1)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this data? This cannot be undone.
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => deleteMutation.mutate()}
              isLoading={deleteMutation.isLoading}
            >
              Delete
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ButtonGroup>
  );
};

export default ListActionButton;
