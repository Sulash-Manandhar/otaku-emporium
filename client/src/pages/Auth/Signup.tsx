import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Text,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react";
import InputField from "../../components/Form/InputField";
import { NavLink } from "react-router-dom";
import { FormDataSchema } from "../../Schema/Form.schema";

const Signup = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  });
  const [formData, setFormData] = useState<FormDataSchema>({
    name: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  const handleonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction={{ base: "column", md: "row" }}
      p="16px"
      backgroundColor="black.400"
    >
      {/* Form Component  */}
      <Box w="45%">
        <Heading as="h1" variant="h1" color="white">
          Sign up
        </Heading>

        <form onSubmit={handleonSubmit}>
          {/* full name  */}
          <InputField
            id="name"
            type="text"
            label="FULL NAME"
            placeholder="FULL NAME"
            formData={formData}
            setFormData={setFormData}
          />
          {/* EMAIL ADDRESS  */}
          <InputField
            id="email"
            type="email"
            label="EMAIL ADDRESS"
            placeholder="EMAIL ADDRESS"
            formData={formData}
            setFormData={setFormData}
          />
          <InputField
            id="password"
            type="password"
            label="PASSWORD"
            placeholder="PASSWORD"
            formData={formData}
            setFormData={setFormData}
          />
          {/* confirm password  */}
          <InputField
            id="confirmPassword"
            type="password"
            label="CONFIRM PASSWORD"
            placeholder="CONFIRM PASSWORD"
            formData={formData}
            setFormData={setFormData}
          />
          {/* Terms and Condition  */}
          <Box my="12px">
            <HStack color="form.label">
              <Checkbox id="terms">I accept all the</Checkbox>
              <NavLink to="/terms-and-conditions">Terms and Conditions</NavLink>
            </HStack>
          </Box>
          <Box w="100%" my="12px">
            <Button type="submit" variant="primary" w="100%" color="form.label">
              Sign up
            </Button>
          </Box>
          <Box color="form.label">
            Already have a account?{" "}
            <NavLink to="/login">
              <Text as="span" color="white" fontWeight="bold">
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
