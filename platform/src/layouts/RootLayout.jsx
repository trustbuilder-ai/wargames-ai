import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout = () => {
  const handleToggleSidebar = () => {
    // Dispatch custom event that DashboardLayout can listen to
    window.dispatchEvent(new Event("toggle-sidebar"));
  };

  return (
    <>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Outlet />
    </>
  );
};

export default RootLayout;