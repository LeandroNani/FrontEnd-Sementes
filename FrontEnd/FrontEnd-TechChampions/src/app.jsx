import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/login.jsx";
import Profile from "./Pages/profile.jsx";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setUser={setUser} />,
    },
    {
      path: "/profile",
      element: <Profile user={user} />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;