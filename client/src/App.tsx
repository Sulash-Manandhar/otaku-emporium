import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import RouteList from "./router/RouteList";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <RouteList />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
