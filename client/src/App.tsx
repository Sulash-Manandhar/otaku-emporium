import { ChakraProvider } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import UserModalProvider from "./context/UserModalProvider";
import DataLoading from "./pages/DataLoading";
import RouteList from "./router/RouteList";
import { theme } from "./themes/theme";
import { getAccessToken } from "./utils/auth";
import { initInterceptor } from "./utils/axiosInterceptor";
import { QueryClient, QueryClientProvider } from "react-query";

const UserModal = lazy(() => import("./components/Utils/UserModal"));
const queryClient = new QueryClient();

const App = () => {
  initInterceptor();
  const access_token = getAccessToken();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <UserModalProvider>
              <RouteList />
              <Suspense fallback={<DataLoading />}>
                {!access_token && <UserModal />}
              </Suspense>
            </UserModalProvider>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
