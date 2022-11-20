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
import { AiFillWarning } from "react-icons/ai";

const Signup = () => {
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
  const [isTermsAndConditionChecked, setIsTermsAndConditionChecked] = useState({
    onClick: false,
    value: false,
  });

  const toast = useToast({
    duration: 3000,
    isClosable: true,
  });

  const handleonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isTermsAndConditionChecked.value === false) {
      let newisTermsAndConditionChecked = {
        ...isTermsAndConditionChecked,
        onClick: true,
      };
      setIsTermsAndConditionChecked(newisTermsAndConditionChecked);
    } else {
      console.log("formData", formData);
    }
  };

  /**
   * This function checks if agreement to terms and condition is checked or not
   * @param e :event
   */
  const handleCheckbox = (e: any) => {
    let newisTermsAndConditionChecked = {
      ...isTermsAndConditionChecked,
      value: e.currentTarget.checked,
    };
    setIsTermsAndConditionChecked(newisTermsAndConditionChecked);
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      p="16px"
      backgroundColor="black.400"
    >
      <Box>
        <Box clipPath="polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)">
          Otaku Emporium
        </Box>
      </Box>
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
            label="Full Name"
            placeholder="Full Name"
            formData={formData}
            setFormData={setFormData}
          />
          {/* EMAIL ADDRESS  */}
          <InputField
            id="email"
            type="email"
            label="Email Address"
            placeholder="Email Address"
            formData={formData}
            setFormData={setFormData}
          />
          {/* Password  */}
          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            formData={formData}
            setFormData={setFormData}
          />
          {/* confirm password  */}
          <InputField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            formData={formData}
            setFormData={setFormData}
          />
          {/* Terms and Condition  */}
          <Box my="12px">
            <HStack color="form.label">
              <Checkbox
                id="terms"
                color="form.formLabel"
                onChange={handleCheckbox}
                borderColor={
                  isTermsAndConditionChecked.onClick &&
                  !isTermsAndConditionChecked.value
                    ? "form.errorOutline"
                    : "white"
                }
              >
                I accept all the
              </Checkbox>
              <NavLink to="/terms-and-conditions">
                <Text
                  fontWeight="bold"
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Terms and Conditions
                </Text>
              </NavLink>
            </HStack>
            {isTermsAndConditionChecked.onClick &&
              !isTermsAndConditionChecked.value && (
                <Flex
                  color="form.errorLabel"
                  alignItems="center"
                  gap="8px"
                  mt="8px"
                >
                  <AiFillWarning fontSize="18px" />
                  <Text
                    color="form.errorLabel"
                    fontWeight="bold"
                    fontSize="14px"
                    textTransform="capitalize"
                  >
                    Should agree to terms and conditions.
                  </Text>
                </Flex>
              )}
          </Box>
          <Box w="100%" my="12px">
            <Button type="submit" variant="primary" w="100%" color="form.label">
              Sign up
            </Button>
          </Box>
          <Box color="form.label">
            Already have a account? &nbsp;
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
