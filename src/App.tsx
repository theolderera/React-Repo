import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Zustand from "./pages/zustand/Zustand";
import Jotai from "./pages/jotai/Jotai";
import ReduxT from "./pages/reduxToolkit/ReduxT";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Zustand />,
    },
    {
      path: "/jotai",
      element: <Jotai />,
    },
    {
      path: "/redux-toolkit",
      element: <ReduxT />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
