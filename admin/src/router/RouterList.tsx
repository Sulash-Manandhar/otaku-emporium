import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import AdminPanel from "@src/pages/AdminPanel";
import LoginPanel from "@src/pages/LoginPanel";
import ErrorBoundry from "./ErrorBoundry";
import UserList from "@src/pages/user/UserList";
import ApparelList from "@src/pages/appreal/ApparelList";
import UserDetail from "@src/pages/user/UserDetail";
import EditUser from "@src/pages/user/EditUser";

const RouterList = () => {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("login") === "true" ?? false
  );

  const login = () => {
    sessionStorage.clear();
    sessionStorage.setItem("login", "true");
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.clear();
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: loggedIn ? (
        <AdminPanel logout={logout} />
      ) : (
        <LoginPanel login={login} />
      ),
      errorElement: <ErrorBoundry />,
      children: [
        {
          path: "/user",
          element: <UserList />,
        },
        {
          path: "user/:id",
          element: <UserDetail />,
        },
        {
          path: "user/edit/:id",
          element: <EditUser />,
        },
        {
          path: "/apparels",
          element: <ApparelList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterList;
