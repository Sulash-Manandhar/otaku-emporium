import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { formIdSchema } from "../../Schema/Form.schema";

interface Props {
  id: formIdSchema;
  label: string;
  formik: any;
}

const PasswordInput: React.FC<Props> = (props) => {
  const { id, label, formik } = props;

  const [show, setShow] = useState(false);

  return (
    <FormControl isInvalid={formik.touched[id] && formik.errors[id]} pb="2">
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          id={id}
          type={show ? "text" : "password"}
          placeholder="********"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <InputRightElement>
          <Button
            size="sm"
            variant="link"
            fontSize="16px"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <AiFillEye /> : <AiFillEyeInvisible />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {formik.touched[id] && formik.errors[id] && (
        <FormErrorMessage>{formik.errors[id]}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default PasswordInput;
