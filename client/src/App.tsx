import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./router/RouteList";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./themes/theme";
import "./App.css";

const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <RouteList />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

export default App;
