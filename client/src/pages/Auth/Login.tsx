import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import FormInput from "../../components/Form/FormInput";
import PasswordInput from "../../components/Form/PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";

const INITIAL_VALUE = {
  email: "",
  password: "",
};

const Login = () => {
  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          "Password must contain at least 8 characters, a capital letter, a symbol and a number."
        ),
      remember_me: Yup.bool().oneOf(
        [true],
        "Please accept terms and conditions to register."
      ),
    }),
    onSubmit: (values) => {
      let newUser = {
        email: values.email,
        password: values.password,
      };
      console.log(newUser);
    },
  });
  return (
    <Box w={["100%", "40%"]} p={8}>
      <Box mb={8}>
        <Heading size="h3">Log In Now</Heading>
        <Text>Log in now get access to many exciting features.</Text>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          id="email"
          type="email"
          label="Email Address"
          formik={formik}
        />
        <PasswordInput id="password" label="Password" formik={formik} />
        <Button type="submit" colorScheme="blue" mt={2}>
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
