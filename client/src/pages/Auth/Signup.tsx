import {
  Box,
  Button,
  Checkbox,
  HStack,
  Text,
  Heading,
  Flex,
  Image,
} from "@chakra-ui/react";
import InputField from "../../components/Form/InputField";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import { GiLaurelCrown } from "react-icons/gi";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axiosInterceptor";
// import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name field is empty.")
        .min(3, "Name must be at least 3 characters."),
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email is required"),
      password: Yup.string()
        .required("Password field is empty")
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          "Password must contain at least 8 characters, a capital letter, a symbol and a number."
        ),
      confirm_password: Yup.string()
        .required("Confirm password is empty")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      terms: Yup.bool().oneOf(
        [true],
        "Please accept terms and conditions to register."
      ),
    }),
    onSubmit: (values: any) => {
      let newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirm: values.confirm_password,
      };

      axios
        .post("/users", newUser)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  });

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      p="0px 16px"
      backgroundColor="black.400"
    >
      <Flex direction={["column", "row"]}>
        {/* Form Component  */}

        <Flex
          w={["100%", "45%"]}
          p="0px 16px"
          borderRadius="4px"
          flexDirection="column"
          alignItems="center"
        >
          {/* Header  */}
          <Box mb="16px">
            <Flex
              clipPath="polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
              width={["250px", "300px", "200px ", "500px"]}
              background="red.400"
              color="white"
              p="8px"
              justifyContent="center"
              _hover={{
                backgroundColor: "red.500",
                cursor: "pointer",
              }}
            >
              <Flex
                alignItems="center"
                gap="16px"
                onClick={() => navigate("/")}
              >
                <GiLaurelCrown fontSize="28px" />
                <Heading size="h4" fontWeight="500">
                  Otaku Emporium
                </Heading>
              </Flex>
            </Flex>
          </Box>
          <Heading as="h1" variant="h1" color="white">
            Sign up
          </Heading>
          <Box w="100%">
            <form onSubmit={formik.handleSubmit}>
              {/* full name  */}
              <InputField
                id="name"
                type="text"
                label="Full Name"
                placeholder="Full Name"
                formik={formik}
              />
              {/* EMAIL ADDRESS  */}
              <InputField
                id="email"
                type="email"
                label="Email Address"
                placeholder="Email Address"
                formik={formik}
              />
              {/* Password  */}
              <InputField
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                formik={formik}
              />
              {/* confirm password  */}
              <InputField
                id="confirm_password"
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                formik={formik}
              />
              {/* Terms and Condition  */}
              <Box my="8px">
                <HStack color="form.label">
                  <Checkbox
                    id="terms"
                    color="form.formLabel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    borderColor={
                      formik.touched.terms && formik.errors.terms
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
                {formik.errors.terms && formik.touched.terms && (
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
                      {formik.errors.terms}
                    </Text>
                  </Flex>
                )}
              </Box>
              <Button type="submit" variant="secondary" my="8px" w="100%">
                Sign up
              </Button>
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

        {/* Image Component  */}
        <Box w={["100%", "auto"]}>
          <Image
            src="images/signup_background.jpg"
            h={["auto", "100vh"]}
            w={["100vw", "auto"]}
            alt="background image"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;
