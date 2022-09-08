import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import TermsAndConditions from "../pages/Auth/TermsAndConditions";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import VerifyOPT from "../pages/Auth/VerifyOPT";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Dashboard/Home";
import AuthRoute from "./AuthRoute";

const RouteList = () => {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email/:id/:email" element={<VerifyEmail />} />
        <Route path="/verify-opt-code/:id/:email" element={<VerifyOPT />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>
      <Route element={<Dashboard />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};

export default RouteList;
