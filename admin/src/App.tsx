import { Box } from "@chakra-ui/layout";
import RouterList from "./router/RouterList";
import "./App.css";

const App = () => {
  return (
    <Box w="100dvw" height="100dvh">
      <RouterList />
    </Box>
  );
};

export default App;
