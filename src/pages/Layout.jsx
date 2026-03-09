import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="page-bg text-default min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
