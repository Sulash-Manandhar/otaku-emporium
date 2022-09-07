import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import OPTPin from "../../components/Form/OPTPin";

const VerifyOPT = () => {
  return (
    <Flex
      padding="16px"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Flex
        w={{ base: "100%", md: "100%", lg: "50%" }}
        gap="16px"
        direction="column"
        margin={{ base: "32px", lg: "16px" }}
      >
        <Heading as="h2" variant={{ base: "h3", lg: "h2" }}>
          Verify your email address
        </Heading>
        <Text>We just emailed a six-digit code to someone</Text>
        <OPTPin />
      </Flex>
    </Flex>
  );
};

export default VerifyOPT;
