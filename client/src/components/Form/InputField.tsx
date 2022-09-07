import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: "email" | "password" | "text" | "tel";
  placeholder: string;
  formik: any;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { id, label, type, placeholder, formik } = props;

  return (
    <Box my="12px">
      <Box
        border="2px solid"
        borderColor={
          formik.touched[id] && formik.errors[id] ? "danger.100" : "black.25"
        }
        borderRadius="8px"
        backgroundColor={
          formik.touched[id] && formik.errors[id] ? "danger.10" : "transparent"
        }
        p="8px 8px 0px 8px"
        _focusWithin={{
          borderColor: "secondary.100",
        }}
      >
        <FormLabel htmlFor={id} m="0" fontSize="12px">
          {label}
        </FormLabel>
        <Input
          type={type}
          id={id}
          variant="unstyled"
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          p="0"
          m="0"
          fontSize="16px"
          background="transparent"
          _autofill={{
            boxShadow: "0 0 0 30px white inset",
          }}
        />
      </Box>

      {formik.touched[id] && formik.errors[id] && (
        <Text color="danger.75" fontSize="xs">
          {formik.errors[id]}
        </Text>
      )}
    </Box>
  );
};

export default InputField;
