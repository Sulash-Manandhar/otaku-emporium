/**
 * Validate changed field
 * @params (id: string, value: string, confirmPassword?: string)
 * @return if error, returns error message
 */
export const validateInput = (id: string, value: string, formData?: any) => {
  if (value === "") {
    return `${id} field is required.`;
  }

  if (id === "name") {
    if (value.match(/^\d/)) {
      return "Name should start with characters.";
    }
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
    if (!value.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
      return "Password must contain at least 8 characters, a capital letter, a symbol and a number.";
    }
  }
  if (id === "confirmPassword") {
    if (value !== formData?.password.value) {
      return "Passwords do not match";
    }
  }
  return "";
};
