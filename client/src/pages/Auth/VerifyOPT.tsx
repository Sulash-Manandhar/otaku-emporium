import {
  Box,
  Button,
  Flex,
  Heading,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import urls from "../../routes/urls";
import { verifyOPTAPI } from "../../utils/requestApi";

const VerifyOPT = () => {
  const toast = useToast({
    isClosable: true,
    position: "bottom",
    duration: 3000,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [invalidPin, setInvalidPin] = useState(false);

  const { isLoading, mutate: verify } = useMutation(
    (data: any) => verifyOPTAPI(data),
    {
      onSuccess: () => {
        toast({ title: "You are now verified", status: "success" });
        navigate(urls.log_in);
      },
      onError: () => setInvalidPin(true),
    }
  );

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (id) {
      verify({ user_id: id, code: pin });
    }
  };

  return (
    <Flex p="16px" gap="4" direction="column">
      <Heading as="h2" variant={{ base: "h3", lg: "h2" }}>
        Verify your email address
      </Heading>
      <Text>We just emailed a six-digit code to your email address.</Text>
      <Box>
        <Stack direction="row" my="4">
          <PinInput
            size="lg"
            type="number"
            variant="filled"
            value={pin}
            onChange={(value) => setPin(value)}
            isInvalid={invalidPin}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </Stack>
        {invalidPin && (
          <Box>
            <Text color="red.600">Invalid Verification Code.</Text>
          </Box>
        )}
      </Box>
      <Box>
        <Button
          type="submit"
          variant="solid"
          colorScheme="linkedin"
          onClick={onSubmit}
          isLoading={isLoading}
          loadingText="Validating..."
        >
          Verify Code
        </Button>
      </Box>
    </Flex>
  );
};

export default VerifyOPT;
