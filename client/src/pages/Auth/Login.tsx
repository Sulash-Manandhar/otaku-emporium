import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputField from "../../components/Form/InputField";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Flex,
  VStack,
  Heading,
  Checkbox,
  Button,
  Box,
  Image,
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  HStack,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email is required"),
      password: Yup.string().required("Password field is empty"),
      remember: Yup.bool(),
    }),
    onSubmit: (values) => {
      let userLoginData = {
        email: values.email,
        password: values.password,
        remember: values.remember,
      };
      axios
        .post("/api/users/login", userLoginData)
        .then((res) => {
          localStorage.setItem("access_token", res.data.token);
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            let userData = { ...err.response.data.user };
            navigate(`/verify-email/${userData._id}/${userData.email}`);
          }
          setErrorMessage(err.response.data.message);
        });
    },
  });

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction={{ base: "column", md: "row" }}
      p="16px"
    >
      <VStack w="40%">
        {/* Image Component  */}
        <Heading as="h2" variant="h2">
          Otaku Emporium
        </Heading>
        <Box boxSize="sm" m="16px" position="relative">
          <Image
            src="./images/t-shirt 3.png"
            alt="Sign up page hero image"
            position="absolute"
            left="-20px"
            top="0px"
          />
          <Image
            src="./images/t-shirt 1.png"
            alt="Sign up page hero image"
            position="absolute"
            top="30px"
            left="30px"
          />
        </Box>
      </VStack>
      {/* Form Component  */}
      <Box w="45%">
        <Heading as="h1" variant="h1" color="black.100">
          Login In
        </Heading>

        {/* Error status alert box  */}
        {errorMessage !== "" && (
          <Alert
            status="error"
            my="20px"
            variant="left-accent"
            justifyContent="space-between"
          >
            <HStack>
              <AlertIcon />
              <AlertDescription>{errorMessage}</AlertDescription>
            </HStack>
            <CloseButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                setErrorMessage("")
              }
            />
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* email address  */}
          <InputField
            id="email"
            type="email"
            formik={formik}
            label="Email Address:"
            placeholder="example@example.com"
          />
          <InputField
            id="password"
            type="password"
            formik={formik}
            label="Password"
            placeholder="********"
          />
          {/* Remember Me  */}
          <Box my="12px">
            <Checkbox
              id="remember"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              Remember Me?
            </Checkbox>
          </Box>
          <Box w="100%" my="12px">
            <Button type="submit" variant="primary" w="100%">
              Login
            </Button>
          </Box>
          <Box>
            Don't have a account?{" "}
            <NavLink to="/signup">
              <Text as="span" color="secondary.100" fontWeight="semibold">
                Register Now
              </Text>
            </NavLink>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
