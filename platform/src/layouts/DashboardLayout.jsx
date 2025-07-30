import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Pass the toggle function to the parent through a custom event
  useEffect(() => {
    const handleToggleRequest = () => {
      toggleSidebar();
    };

    window.addEventListener("toggle-sidebar", handleToggleRequest);
    return () => window.removeEventListener("toggle-sidebar", handleToggleRequest);
  }, [sidebarCollapsed]);

  return (
    <div className="dashboard-layout">
      <Sidebar isCollapsed={sidebarCollapsed} isMobile={isMobile} />
      <main
        className={`dashboard-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
      >
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;