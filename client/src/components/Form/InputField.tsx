import { Box, Flex, FormLabel, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FormDataSchema, formIdSchema } from "../../Schema/Form.schema";

const formLabelStyle = {
  m: "0",
  fontSize: "12px",
  color: "form.label",
  fontWeight: "bold",
};

interface InputFieldProps {
  id: formIdSchema;
  label: string;
  type: "email" | "password" | "text" | "tel";
  placeholder: string;
  formData: FormDataSchema;
  setFormData: (params: FormDataSchema) => void;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { id, label, type, placeholder, formData, setFormData } = props;
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  useEffect(() => {
    setIsInputEmpty(() => (formData[id].value === "" ? true : false));
  }, [id, formData]);

  const validateInput = (value: string) => {
    if (id === "name") {
      if (value.length < 3) {
        return "Name should be atleast 3 character long.";
      }
    }

    if (id === "email") {
      if (
        !value.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        return "Invalid email address.";
      }
    }
    if (id === "password") {
      if (
        !value.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      ) {
        return "Password must contain at least 8 characters, a capital letter, a symbol and a number.";
      }
    }
    if (id === "confirmPassword") {
      if (value !== formData?.confirmPassword?.value) {
        return "Passwords do not match";
      }
    }
    return "";
  };
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    let errorMessage: string = "";
    errorMessage = validateInput(e.currentTarget.value);

    let newFormData = {
      ...formData,
      [id]: {
        ...formData[id],
        value: e.currentTarget.value,
        error: errorMessage,
      },
    };
    setFormData(newFormData);
  };

  return (
    <Box my="16px">
      <Flex
        flexDir="column"
        p={!isInputEmpty ? "8px 8px 0px 8px" : "8px"}
        justifyContent="flex-start"
        border="2px solid"
        borderColor="transparent"
        borderRadius="4px"
        backgroundColor="form.background"
      >
        {!isInputEmpty && (
          <FormLabel htmlFor={id} sx={formLabelStyle}>
            {label}
          </FormLabel>
        )}
        <Input
          id={id}
          type={type}
          variant="unstyled"
          color="form.label"
          placeholder={placeholder}
          p="0"
          m="0"
          value={formData[id].value}
          onChange={handleOnChange}
          fontSize="16px"
          _placeholder={{
            color: "form.label",
            fontSize: "16px",
            fontWeight: "semi-bold",
          }}
          background="transparent"
          _autofill={{
            boxShadow: "0 0 0 30px white inset",
          }}
        />
      </Flex>
    </Box>
  );
};

export default InputField;
