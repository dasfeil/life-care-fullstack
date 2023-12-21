import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import MemberInquiry from "./routes/MemberInquiry";

const router = createBrowserRouter([{
  path: "/",
  element: <Root/>,
  children: [
    {
      path: "login",
      element: <Login/>
    },
    {
      path: "signup",
      element: <SignUp/>,
    },
    {
      path: "inquiry",
      element: <MemberInquiry/>
    }
  ]
}]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
