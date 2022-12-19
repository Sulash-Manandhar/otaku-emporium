import {
  Grid,
  GridItem,
  FormControl,
  Box,
  Heading,
  Checkbox,
  Text,
  FormErrorMessage,
  Button,
  Flex,
  useToast,
  Alert,
  AlertIcon,
  CloseButton,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { NavLink } from "react-router-dom";
import FormInput from "../../components/Form/FormInput";
import PasswordInput from "../../components/Form/PasswordInput";
import { registerUserAPI, sendVerificationAPI } from "../../utils/requestApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../../routes/urls";
import NavigationModal from "../../components/signup/NavigationModal";
import { validateSignUp } from "../../constant/validation";

const INITIAL_VALUE = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  terms: false,
};

const Signup = () => {
  const toast = useToast({
    isClosable: true,
    duration: 3000,
    position: "bottom",
  });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: sendVerificationCode, isLoading: sendingCode } = useMutation(
    (data: any) => sendVerificationAPI(data),
    {
      onError: () => navigate(urls.log_in),
    }
  );

  const register = useMutation((data: any) => registerUserAPI(data), {
    onSuccess: (res) => {
      toast({
        title: `${res?.data?.msg}`,
        status: "success",
      });
      const { email } = res?.data?.data?.user;
      sendVerificationCode({
        email: email,
      });
      onOpen();
    },
    onError: (err: any) => {
      setErrorMessage(err?.response?.data?.message);
    },
  });
  const { isLoading: addingUser } = register;

  const user = register?.data?.data?.data?.user;

  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: validateSignUp,
    onSubmit: (values) => {
      let newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      register.mutate(newUser);
    },
  });

  const OPTurl = user && urls.verify_opt.replace(":id", user.id);

  return (
    <Box p={8}>
      <Box mb="8">
        <Heading size="h3">Sign Up</Heading>
        <Text>Sign up now get access to many exciting features.</Text>
      </Box>
      <NavigationModal
        isOpen={isOpen}
        onClose={onClose}
        url={OPTurl}
        isLoading={sendingCode}
        contentHeader="Verification Code (OPT) has been sent to your email address."
        contentBody="You will be navigated to verify code page."
        buttonMsg="Verify OPT Code"
        loadingMsg="SendingOPT"
      />
      <form onSubmit={formik.handleSubmit}>
        {errorMessage.length > 0 && (
          <Alert status="error" mb="4">
            <AlertIcon />
            <Box w="100%">{errorMessage}</Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={0}
              top={0}
              onClick={() => setErrorMessage("")}
            />
          </Alert>
        )}
        <Grid templateColumns="repeat(2,1fr)" gap={4}>
          <GridItem>
            <FormInput
              id="name"
              type="text"
              label="Full Name"
              formik={formik}
            />
          </GridItem>
          <GridItem>
            <FormInput
              id="email"
              type="email"
              label="Email Address"
              formik={formik}
            />
          </GridItem>
          <GridItem>
            <PasswordInput id="password" label="Password" formik={formik} />
          </GridItem>
          <GridItem>
            <PasswordInput
              id="confirm_password"
              label="Confirm Password"
              formik={formik}
            />
          </GridItem>
          <GridItem>
            <FormControl
              isInvalid={formik.touched.terms && !!formik.errors.terms}
              mb={2}
            >
              <Flex gap={2}>
                <Checkbox
                  id="terms"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.terms && !!formik.errors.terms}
                />
                <Text>I accepts all</Text>
                <Text
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                >
                  <NavLink to="/terms-and-conditions">
                    Terms and Conditions
                  </NavLink>
                </Text>
              </Flex>
              {formik.touched.terms && formik.errors.terms && (
                <FormErrorMessage>{formik.errors.terms}</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
        </Grid>
        <Button mt={2} type="submit" colorScheme="blue" isLoading={addingUser}>
          Submit
        </Button>
      </form>
      <Box my="3">
        <Flex>
          <Text>Already have an account? &nbsp;</Text>
          <Link
            fontWeight="bold"
            color="green.500"
            onClick={() => navigate(urls.log_in)}
          >
            Login
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Signup;
