import { createBrowserRouter } from "react-router-dom";
import ErrorBoundry from "./ErrorBoundry";
import UserList from "../pages/Dashboard/User/UserList.tsx";
import LoginPanel from "../pages/LoginPanel";
import AdminPanel from "../pages/AdminPanel";
import UserDetail from "../pages/Dashboard/User/UserDetail";
import ApparelList from "../pages/Dashboard/Apparels/ApparelList.tsx";
import EditUser from "../pages/Dashboard/User/EditUser.tsx";
import EditApparels from "../components/Apparel/EditApparels.tsx";
import ApparelDetails from "../pages/Dashboard/Apparels/ApparelDetails.tsx";

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

  return router;
}
