import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteList from "./router/RouteList";
import { theme } from "./themes/theme";
import { initInterceptor } from "./utils/axiosInterceptor";

const App = () => {
  initInterceptor();

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
