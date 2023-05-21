import { styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { getRouteList } from "./router/routerList";
import IsLoggedInProvider from "./storage/IsLoggedInContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const router = getRouteList();

  return (
    <QueryClientProvider client={queryClient}>
      <IsLoggedInProvider>
        <AppWrapper>
          <RouterProvider router={router} />
        </AppWrapper>
      </IsLoggedInProvider>
    </QueryClientProvider>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
`;
