import {
  Box,
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible, AiFillWarning } from "react-icons/ai";
import { validateInput } from "../../constant/functions";
import { FormDataSchema, formIdSchema } from "../../Schema/Form.schema";

const formLabelStyle = {
  m: "0",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase",
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
  const [show, setShow] = useState(false);
  let errorMessage: string = "";

  useEffect(() => {
    setIsInputEmpty(() => (formData[id].value === "" ? true : false));
  }, [id, formData]);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (id !== "confirmPassword") {
      errorMessage = validateInput(id, e.currentTarget.value);
    } else {
      errorMessage = validateInput(id, e.currentTarget.value, formData);
    }

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

  const handleOnBlur = (e: React.FormEvent<HTMLInputElement>) => {
    if (id !== "confirmPassword") {
      errorMessage = validateInput(id, e.currentTarget.value);
    } else {
      errorMessage = validateInput(id, e.currentTarget.value, formData);
    }
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
        w="100%"
        justifyContent="flex-start"
        border="2px solid"
        borderColor={formData[id]?.error ? "form.errorOutline" : "transparent"}
        borderRadius="4px"
        backgroundColor={
          formData[id]?.error ? "form.errorBackground" : "form.background"
        }
        _focusWithin={{
          backgroundColor: "form.background",
          borderColor: formData[id]?.error ? "form.errorOutline" : "white",
        }}
      >
        {!isInputEmpty && (
          <FormLabel
            htmlFor={id}
            sx={formLabelStyle}
            color={formData[id]?.error ? "form.errorLabel" : "form.label"}
          >
            {label}
          </FormLabel>
        )}
        <InputGroup>
          <Input
            id={id}
            type={show ? "text" : type}
            variant="unstyled"
            color="form.label"
            placeholder={placeholder}
            p="0"
            m="0"
            value={formData[id].value}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            fontSize="16px"
            _placeholder={{
              color: formData[id]?.error ? "form.errorLabel" : "form.label",
              fontSize: "16px",
              fontWeight: "semi-bold",
              textTransform: "uppercase",
            }}
            background="transparent"
            isRequired
            autoFocus={id === "name" ? true : false}
          />
          {(id === "password" || id === "confirmPassword") && (
            <InputRightAddon
              backgroundColor="none"
              color="white"
              background="transparent"
              border="none"
              children={
                <Icon
                  as={show ? AiFillEyeInvisible : AiFillEye}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => setShow((prev) => !prev)}
                />
              }
            />
          )}
        </InputGroup>
      </Flex>
      {formData[id]?.error && (
        <Flex color="form.errorLabel" alignItems="center" gap="8px" mt="8px">
          <AiFillWarning fontSize="18px" />
          <Text
            color="form.errorLabel"
            fontWeight="bold"
            fontSize="14px"
            textTransform="capitalize"
          >
            {formData[id].error}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default InputField;
