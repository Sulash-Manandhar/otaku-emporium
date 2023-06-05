import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorBoundry from "./ErrorBoundry.tsx";
import UserList from "../pages/Dashboard/User/UserList.tsx";
import LoginPanel from "../pages/LoginPanel.tsx";
import AdminPanel from "../pages/AdminPanel.tsx";
import UserDetail from "../pages/Dashboard/User/UserDetail.tsx";
import ApparelList from "../pages/Dashboard/Apparels/ApparelList.tsx";
import EditUser from "../pages/Dashboard/User/EditUser.tsx";
import EditApparels from "../components/Apparel/EditApparels.tsx";
import ApparelDetails from "../pages/Dashboard/Apparels/ApparelDetails.tsx";
import { useState } from "react";

const RouteList = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: loggedIn ? (
        <AdminPanel logOut={logOut} />
      ) : (
        <LoginPanel logIn={logIn} />
      ),
      errorElement: <ErrorBoundry />,
      children: [
        {
          path: "/user",
          element: <UserList />,
        },
        {
          path: "/user/:userId",
          element: <UserDetail />,
        },
        {
          path: "/user/edit/:userId",
          element: <EditUser />,
        },
        {
          path: "/apparels",
          element: <ApparelList />,
        },
        {
          path: "/apparels/:apparelId",
          element: <ApparelDetails />,
        },
        {
          path: "/apparels/edit/:apparelId",
          element: <EditApparels />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouteList;
