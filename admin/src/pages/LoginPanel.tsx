import {
  Grid,
  GridItem,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Flex,
  useToast,
  Button,
  Text,
} from "@chakra-ui/react";
import { PASSWORD, USERNAME } from "@src/config";
import { useState } from "react";

interface Props {
  login: () => void;
}
const LoginPanel: React.FC<Props> = (props) => {
  const { login } = props;
  const toast = useToast();

  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    if (username !== USERNAME || password !== PASSWORD) {
      setErrorMessage("Invalid username or password.");
      return;
    }
    toast({
      title: "User successfully logged in.",
      status: "success",
    });
    login();
  };

  return (
    <Grid h="100dvh" placeItems="center">
      <GridItem>
        <Heading as="h1" size="2xl" mb="3rem">
          Otaku Emporium
        </Heading>
        {errorMessage && <Text>{errorMessage}</Text>}
        <form onSubmit={handleFormSubmit}>
          <Flex direction="column" gap="1.25rem">
            <FormControl>
              <FormLabel>Username:</FormLabel>
              <Input type="text" name="username" />
            </FormControl>
            <FormControl>
              <FormLabel>Password:</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            <Button type="submit" colorScheme="green">
              Login
            </Button>
          </Flex>
        </form>
      </GridItem>
    </Grid>
  );
};

export default LoginPanel;
