import React from "react";
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/login.jsx";
import Profile from "./Pages/profile.jsx";
import Carreiras from "./Pages/carreiras.jsx";
import Avaliar from "./Pages/avaliar.jsx";
import MinhasAvaliacoes from "./Pages/minhasAvaliacoes.jsx";

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
    {
      path: "/avaliar",
      element: <Avaliar />,
    },
    {
      path: "/minhasavaliacoes",
      element: <MinhasAvaliacoes />,
    }
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

