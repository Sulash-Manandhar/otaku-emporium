import { HStack, PinInput, PinInputField, Button, Box } from "@chakra-ui/react";
import React, { useState } from "react";

const OPTPin = () => {
  const [isInValid, setIsInValid] = useState<boolean>(false);
  const [pin, setPin] = useState("");

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(pin);
    setIsInValid(true);
  };

  return (
    <>
      <HStack>
        <PinInput
          otp
          focusBorderColor="secondary.100"
          placeholder="-"
          variant="outline"
          value={pin}
          onChange={(value) => setPin(value)}
          autoFocus={true}
        >
          <PinInputField
            name="pin1"
            backgroundColor={isInValid ? "danger.10" : "transparent"}
            borderColor={isInValid ? "danger.100" : "black.25"}
          />
          <PinInputField
            name="pin2"
            backgroundColor={isInValid ? "danger.10" : "transparent"}
            borderColor={isInValid ? "danger.100" : "black.25"}
          />
          <PinInputField
            name="pin2"
            backgroundColor={isInValid ? "danger.10" : "transparent"}
            borderColor={isInValid ? "danger.100" : "black.25"}
          />
          <PinInputField
            name="pin2"
            backgroundColor={isInValid ? "danger.10" : "transparent"}
            borderColor={isInValid ? "danger.100" : "black.25"}
          />
          <PinInputField
            name="pin2"
            backgroundColor={isInValid ? "danger.10" : "transparent"}
            borderColor={isInValid ? "danger.100" : "black.25"}
          />
          <PinInputField
            name="pin2"
            backgroundColor={isInValid ? "danger.10" : "transparent"}
            borderColor={isInValid ? "danger.100" : "black.25"}
          />
        </PinInput>
      </HStack>
      <Box w="50%" my="12px">
        <Button type="submit" variant="primary" w="100%" onClick={onSubmit}>
          Sign up
        </Button>
      </Box>
    </>
  );
};

export default OPTPin;
