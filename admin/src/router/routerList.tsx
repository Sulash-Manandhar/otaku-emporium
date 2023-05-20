import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Dashboard/Welcome";
import ErrorBoundry from "./ErrorBoundry";
import User from "../pages/Dashboard/User";
import LoginPanel from "../pages/LoginPanel";
import AdminPanel from "../pages/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPanel />,
    errorElement: <ErrorBoundry />,
  },
  {
    path: "/",
    element: <AdminPanel />,
    errorElement: <ErrorBoundry />,
    children: [
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/",
        element: <Welcome />,
      },
    ],
  },
]);
