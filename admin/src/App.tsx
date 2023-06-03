import { styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { getRouteList } from "./router/routerList";
import IsLoggedInProvider, {
  useIsLoggedInContext,
} from "./storage/IsLoggedInContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IsLoggedInProvider>
        <AppWrapper />
      </IsLoggedInProvider>
    </QueryClientProvider>
  );
}

export default App;

const AppWrappera = styled.div`
  width: 100dvw;
  height: 100dvh;
`;
function AppWrapper() {
  const { loggedIn } = useIsLoggedInContext();

  const router = getRouteList(loggedIn);

  return (
    <AppWrappera>
      <RouterProvider router={router} />
    </AppWrappera>
  );
}
