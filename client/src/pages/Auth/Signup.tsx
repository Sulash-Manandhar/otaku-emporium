import React, { useState } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Text,
  Heading,
  Flex,
  Image,
  VStack,
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import InputField from "../../components/Form/InputField";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name field is empty.")
        .min(3, "Name must be at least 3 characters."),
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email is required"),
      password: Yup.string()
        .required("Password field is empty")
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          "Password must contain at least 8 characters, a capital letter, a symbol and a number."
        ),
      confirm_password: Yup.string()
        .required("Confirm password is empty")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      terms: Yup.bool().oneOf(
        [true],
        "Please accept terms and conditions to register."
      ),
    }),
    onSubmit: (values) => {
      let newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      axios
        .post("api/users/", newUser)
        .then((res) => {
          let userData = { ...res.data.user };
          toast({
            status: "success",
            title: res.data.message,
          });
          navigate(`/verify-opt-code/${userData._id}/${userData.email}`);
        })
        .catch((err) => {
          toast({
            title: err.response.data.message,
            status: "error",
          });
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
          Sign up
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
          {/* full name  */}
          <InputField
            id="name"
            type="text"
            formik={formik}
            label="Full name"
            placeholder="Sulash Manandhar"
          />
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
          {/* confirm password  */}
          <InputField
            id="confirm_password"
            type="password"
            formik={formik}
            label="Confirm Password"
            placeholder="********"
          />
          {/* Terms and Condition  */}
          <Box my="12px">
            <HStack>
              <Checkbox
                id="terms"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                borderColor={
                  formik.touched.terms && formik.errors.terms
                    ? "danger.400"
                    : "secondary.300"
                }
              >
                I accept all the
              </Checkbox>
              <NavLink to="/terms-and-conditions">Terms and Conditions</NavLink>
            </HStack>
            {formik.errors.terms && formik.touched.terms && (
              <Text color="danger.500" fontSize="xs">
                {formik.errors.terms}
              </Text>
            )}
          </Box>
          <Box w="100%" my="12px">
            <Button type="submit" variant="primary" w="100%">
              Sign up
            </Button>
          </Box>
          <Box>
            Already have a account?{" "}
            <NavLink to="/login">
              <Text as="span" color="secondary.100" fontWeight="semibold">
                Login Now
              </Text>
            </NavLink>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
