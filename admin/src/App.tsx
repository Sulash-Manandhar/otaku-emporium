import { styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routerList";

function App() {
  return (
    <AppWrapper>
      <RouterProvider router={router} />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
`;
