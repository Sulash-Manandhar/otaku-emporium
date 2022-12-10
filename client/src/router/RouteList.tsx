import { Route, Routes } from "react-router-dom";
import urls from "../route/urls";
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
        <Route path={urls.log_in} element={<Login />} />
        <Route path={urls.sign_in} element={<Signup />} />
        <Route path={urls.verify_email} element={<VerifyEmail />} />
        <Route path={urls.verify_opt} element={<VerifyOPT />} />
        <Route
          path={urls.terms_and_condition}
          element={<TermsAndConditions />}
        />
      </Route>
      <Route element={<Dashboard />}>
        <Route path={urls.home} element={<Home />} />
        <Route path={urls.apparels} element={<Apparels />} />
        <Route path={urls.profile} element={<Profile />} />
        <Route path={urls.favourite} element={<Favorites />} />
      </Route>
      {/* 404  Page Not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RouteList;
