import * as Yup from "yup";

export const validateSignUp = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "Name must be at least 3 characters."),
  email: Yup.string()
    .email("Please enter a valid email address.")
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
});
