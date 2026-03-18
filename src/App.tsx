import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import Zustand from "./pages/zustand/Zustand";
import Redux from "./pages/redux/Redux";
import Jotai from "./pages/jotai/Jotai";

const Layout = () => {
  return (
    <div>
      <nav style={{ padding: "20px", display: "flex", gap: "10px", backgroundColor: "#f0f0f0" }}>
        <Link to="/"><button style={{ padding: "10px 20px", cursor: "pointer" }}>Zustand</button></Link>
        <Link to="/redux"><button style={{ padding: "10px 20px", cursor: "pointer" }}>Redux</button></Link>
        <Link to="/jotai"><button style={{ padding: "10px 20px", cursor: "pointer" }}>Jotai</button></Link>
      </nav>
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Zustand />,
        },
        {
          path: "/redux",
          element: <Redux />,
        },
        {
          path: "/jotai",
          element: <Jotai />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
