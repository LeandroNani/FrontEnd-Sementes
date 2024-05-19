import React from "react";
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/login.jsx";
import Profile from "./Pages/profile.jsx";
import Carreiras from "./Pages/carreiras.jsx";



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/carreiras",
      element: <Carreiras />,
    },
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

