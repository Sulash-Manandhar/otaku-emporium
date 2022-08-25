import React from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import InputField from "../../components/Form/InputField";
import axios from "axios";

const Signup = () => {
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
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
      email: Yup.string()
        .email("Email is invalid")
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
        password2: values.confirm_password,
      };
      axios
        .post("api/users/", newUser)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Box w="40%" p="4px">
      <Heading as="h1" variant="h1">
        Sign up
      </Heading>
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
            <Link>Terms and Conditions</Link>
          </HStack>
          {formik.errors.terms && formik.touched.terms && (
            <Text color="danger.500" fontSize="xs">
              {formik.errors.terms}
            </Text>
          )}
        </Box>
        <Box w="100%" my="12px">
          <Button type="submit" variant="secondary" w="100%">
            Sign up
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
