import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./router/RouteList";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./themes/theme";
import axios from "axios";

const App = () => {
  axios.defaults.baseURL = "http://localhost:5000/";

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
