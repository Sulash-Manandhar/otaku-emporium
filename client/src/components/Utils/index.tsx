import { Box } from "@chakra-ui/react";
import React from "react";

interface SpacerProps {
  color?: string;
  background?: string;
}

const Spacer: React.FC<SpacerProps> = (props) => {
  return <Box w="100%" h={8} {...props}></Box>;
};

export default Spacer;
