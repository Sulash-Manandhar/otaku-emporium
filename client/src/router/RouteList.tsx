import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import Dashboard from "../pages/Dashboard";
import AuthRoute from "./AuthRoute";

const RouteList = () => {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default RouteList;
