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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../components/Form/FormInput";
import PasswordInput from "../../components/Form/PasswordInput";
import { registerUser } from "../../utils/requestApi";
import { useState } from "react";

const INITIAL_VALUE = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  terms: false,
};

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useToast({
    isClosable: true,
    duration: 3000,
    position: "bottom",
  });

  const register = useMutation((data: any) => registerUser(data), {
    onSuccess: (res) => {
      toast({
        title: `${res?.data?.msg}`,
        status: "success",
      });
    },
    onError: (err: any) => {
      setErrorMessage(err?.response?.data?.message);
    },
  });

  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required.")
        .min(3, "Name must be at least 3 characters."),
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          "Password must contain at least 8 characters, a capital letter, a symbol and a number."
        ),
      confirm_password: Yup.string()
        .required("Confirm password is required")
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
      register.mutate(newUser);
    },
  });
  return (
    <Box p={8}>
      <Box mb="8">
        <Heading size="h3">Sign Up</Heading>
        <Text>Sign up now get access to many exciting features.</Text>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        {errorMessage.length > 0 && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
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
        <Button mt={2} type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
