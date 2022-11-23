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
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiFillWarning } from "react-icons/ai";
import { formIdSchema } from "../../Schema/Form.schema";

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
  formik: any;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { id, label, type, placeholder, formik } = props;
  const [show, setShow] = useState(false);

  const { values, touched, errors } = formik;

  return (
    <Box my="16px">
      <Flex
        flexDir="column"
        p="8px"
        w="100%"
        justifyContent="flex-start"
        border="2px solid"
        borderColor={
          touched[id] && errors[id] ? "form.errorOutline" : "transparent"
        }
        borderRadius="4px"
        backgroundColor={
          touched[id] && errors[id] ? "form.errorBackground" : "form.background"
        }
        _focusWithin={{
          backgroundColor: "form.background",
          borderColor:
            touched[id] && errors[id] ? "form.errorOutline" : "white",
        }}
      >
        {values[id] && (
          <FormLabel
            htmlFor={id}
            sx={formLabelStyle}
            color={touched[id] && errors[id] ? "form.errorLabel" : "form.label"}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fontSize="16px"
            _placeholder={{
              color:
                touched[id] && errors[id] ? "form.errorLabel" : "form.label",
              fontSize: "16px",
              fontWeight: "semi-bold",
              textTransform: "uppercase",
            }}
            background="transparent"
          />
          {(id === "password" || id === "confirm_password") && (
            <InputRightAddon
              backgroundColor="none"
              color="white"
              h="auto"
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
      {/* Display Error  */}
      {touched[id] && errors[id] && (
        <Flex color="form.errorLabel" alignItems="center" gap="8px" mt="8px">
          <AiFillWarning fontSize="18px" />
          <Text
            color="form.errorLabel"
            fontWeight="bold"
            fontSize="14px"
            textTransform="capitalize"
          >
            {errors[id]}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default InputField;
