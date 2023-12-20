import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";

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
    }
  ]
}]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
