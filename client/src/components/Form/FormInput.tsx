import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { formIdSchema } from "../../Schema/common";

interface Props {
  id: formIdSchema;
  type: "text" | "email" | "tel" | "number";
  label: string;
  formik: any;
}
const FormInput: React.FC<Props> = (props) => {
  const { id, label, type, formik } = props;

  return (
    <FormControl isInvalid={formik.touched[id] && formik.errors[id]} pb={2}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        id={id}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.touched[id] && formik.errors[id] && (
        <FormErrorMessage>{formik.errors[id]}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormInput;
