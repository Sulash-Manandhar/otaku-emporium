import { styled } from "styled-components";
import RouteList from "./router/RouterList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <RouteList />
      </AppWrapper>
    </QueryClientProvider>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
`;
