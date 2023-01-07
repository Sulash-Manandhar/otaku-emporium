import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Link,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import FormInput from "../../components/Form/FormInput";
import PasswordInput from "../../components/Form/PasswordInput";
import { useFormik } from "formik";
import { validateLogin } from "../../constant/validation";
import { loginAPI } from "../../utils/requestApi";
import { useMutation } from "react-query";
import { setAccessToken, setRefreshToken, setUserInfo } from "../../utils/auth";
import { NavLink, useNavigate } from "react-router-dom";
import urls from "../../routes/urls";
import NavigationModal from "../../components/signup/NavigationModal";

const INITIAL_VALUE = {
  email: "",
  password: "",
  remember_me: false,
};

const Login = () => {
  const toast = useToast({
    isClosable: true,
    duration: 3000,
    position: "bottom",
  });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");

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
        onOpen();
        toast({
          title: err?.response?.data?.msg,
          status: "info",
        });

        setUserId(err?.response?.data?.data?.user?.id);
      } else {
        setErrorMessage(err?.response?.data?.msg);
      }
    },
  });

  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: validateLogin,
    onSubmit: (values) => {
      let user = {
        email: values.email,
        password: values.password,
        remember: values.remember_me,
      };
      loginQuery.mutate(user);
    },
  });

  return (
    <Box w={["100%", "50%"]} p={8}>
      <Box mb={8}>
        <Heading size="h3">Log In Now</Heading>
        <Text>Log in now, get access to many exciting features.</Text>
      </Box>
      <NavigationModal
        isOpen={isOpen}
        onClose={onClose}
        contentHeader="Verify your email address now!"
        contentBody="You will be redirected to verify email"
        buttonMsg="Verify Email"
        url={urls.verify_email.replace(":id", userId)}
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
        <FormInput
          id="email"
          type="email"
          label="Email Address"
          formik={formik}
        />
        <PasswordInput id="password" label="Password" formik={formik} />
        <FormControl
          isInvalid={formik.touched.remember_me && !!formik.errors.remember_me}
          mb={2}
        >
          <Checkbox
            id="remember_me"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.remember_me && !!formik.errors.remember_me
            }
          >
            Remember Me?
          </Checkbox>
          {formik.touched.remember_me && formik.errors.remember_me && (
            <FormErrorMessage>{formik.errors.remember_me}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          mt={2}
          loadingText="Loggin..."
          isLoading={loginQuery.isLoading}
        >
          Log In
        </Button>
      </form>
      <NavLink to={urls.forgot_password}>
        <Text my="4">Forgot Password ?</Text>
      </NavLink>
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
    </Box>
  );
};

export default Login;
