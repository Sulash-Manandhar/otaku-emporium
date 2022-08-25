import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./router/RouteList";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./themes/theme";
import axios from "axios";

const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <RouteList />
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

export default App;
