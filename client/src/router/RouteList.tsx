import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../pages/404";
import Dashboard from "../pages/Dashboard";
import urls from "../routes/urls";
import AuthRoute from "./AuthRoute";

const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const VerifyEmail = lazy(() => import("../pages/Auth/VerifyEmail"));
const VerifyOPT = lazy(() => import("../pages/Auth/VerifyOPT"));
const TermsAndConditions = lazy(
  () => import("../pages/Auth/TermsAndConditions")
);

const Home = lazy(() => import("../pages/Dashboard/Home"));
const Profile = lazy(() => import("../pages/Dashboard/Profile"));
const Apparels = lazy(() => import("../pages/Dashboard/Apparels"));
const Favorites = lazy(() => import("../pages/Dashboard/Favorites"));
const Accessories = lazy(() => import("../pages/Dashboard/Accessories"));

const RouteList = () => {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path={urls.log_in} element={<Login />} />
        <Route path={urls.sign_in} element={<Signup />} />
        <Route path={urls.verify_email} element={<VerifyEmail />} />
        <Route path={urls.verify_opt} element={<VerifyOPT />} />
        <Route path={urls.profile} element={<Profile />} />
        <Route path={urls.favourite} element={<Favorites />} />
        <Route
          path={urls.terms_and_condition}
          element={<TermsAndConditions />}
        />
      </Route>
      <Route element={<Dashboard />}>
        <Route path={urls.home} element={<Home />} />
        <Route path={urls.apparels} element={<Apparels />} />
        <Route path={urls.accessories} element={<Accessories />} />
      </Route>
      {/* 404  Page Not found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RouteList;
