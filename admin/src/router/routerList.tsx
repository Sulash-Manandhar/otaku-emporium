import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Dashboard/Welcome";
import ErrorBoundry from "./ErrorBoundry";
import UserList from "../pages/Dashboard/User/UserList.tsx";
import LoginPanel from "../pages/LoginPanel";
import AdminPanel from "../pages/AdminPanel";
import UserDetail from "../pages/Dashboard/User/UserDetail";

export function getRouteList(loggedIn: boolean) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: loggedIn ? <AdminPanel /> : <LoginPanel />,
      errorElement: <ErrorBoundry />,
      children: [
        {
          path: "/user",
          element: <UserList />,
        },
        {
          path: "user/:userId",
          element: <UserDetail />,
        },
        {
          path: "/",
          element: <Welcome />,
        },
      ],
    },
  ]);

  return router;
}
