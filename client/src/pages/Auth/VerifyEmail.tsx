import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  Button,
  useToast,
  Flex,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import urls from "../../routes/urls";
import { sendVerificationAPI } from "../../utils/requestApi";

const VerifyEmail = () => {
  const toast = useToast({
    isClosable: true,
    duration: 3000,
    position: "bottom",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const [email, setEmail] = useState("");

  const { mutate: sendVerificationCode, isLoading: sendingCode } = useMutation(
    (data: any) => sendVerificationAPI(data),
    {
      onSuccess: () => {
        toast({
          title: `Verification Code is sent to your email address`,
          status: "success",
        });
        id && navigate(urls.verify_opt.replace(":id", id));
      },
      onError: (err: any) => {
        toast({
          title: err?.response?.data?.msg,
          status: "error",
        });
      },
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendVerificationCode({
      email: email,
    });
  };

  return (
    <Flex direction="column" padding="16px" w="50%" gap={4}>
      <Box>
        <Heading size="h3">Verify your email address</Heading>
        <Text>We will sent verification code to your email address+</Text>
      </Box>
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <Button
          mt={4}
          isLoading={sendingCode}
          loadingText="SendingOPT"
          colorScheme="linkedin"
          onClick={handleSubmit}
        >
          Send Verification Code
        </Button>
      </form>
      <Box pb="5px">
        <Flex>
          <Text>Don't have an account? &nbsp;</Text>
          <Link
            fontWeight="bold"
            color="green.500"
            onClick={() => navigate(urls.sign_in)}
          >
            Create One
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default VerifyEmail;
