import { Route, Routes } from "react-router-dom";
import PageNotFound from "../pages/404";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import TermsAndConditions from "../pages/Auth/TermsAndConditions";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import VerifyOPT from "../pages/Auth/VerifyOPT";
import Dashboard from "../pages/Dashboard";
import Apparels from "../pages/Dashboard/Apparels";
import Favorites from "../pages/Dashboard/Favorites";
import Home from "../pages/Dashboard/Home";
import Profile from "../pages/Dashboard/Profile";
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
        <Route path="/apparels" element={<Apparels />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/favorites" element={<Favorites />} />
      </Route>
      {/* 404  Page Not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RouteList;
