import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import MemberInquiry from "./routes/MemberInquiry";
import ErrorRoute from "./routes/ErrorRoute";
import { RequireAuth } from "./components/RequireAuth";
import React from "react";
import { AuthProvider } from "./context/AuthProvider";
import Logout from "./routes/Logout";
import Profile from "./routes/Profile";
import User from "./routes/User";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "",
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        element: <RequireAuth allowedRoles={["ADMIN"]} />,
        children: [
          {
            path: "manage/inquiry",
            element: <MemberInquiry />,
          },
        ],
      },
      {
        element: <RequireAuth allowedRoles={["USER", "ADMIN"]} />,
        children: [
          {
            path: "user",
            element: <User />,
            children: [
              {
                path: "profile",
                element: <Profile />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
