import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import MemberInquiry from "./routes/MemberInquiry";
import ErrorRoute from "./routes/ErrorRoute";
import { RequireAuth } from "./components/RequireAuth";
import React from "react";
import { AuthProvider } from "./context/AuthProvider";

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
        element: <p className="m-auto">Landing page</p>,
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
        element: <RequireAuth allowedRoles={["ADMIN"]} />,
        children: [
          {
            path: "manage/inquiry",
            element: <MemberInquiry />,
          },
        ],
      },
      {
        element: <RequireAuth allowedRoles={["USER", "ADMIN"]}></RequireAuth>,
        children: [
          {
            path: "user/profile",
            element: <div className="m-auto">You are an user</div>,
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
