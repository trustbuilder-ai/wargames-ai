import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, isMobile }) => {
  const navItems = [
    { path: "/dashboard/dashboard", name: "Dashboard", icon: "📊" },
    { path: "/dashboard/wargames", name: "Wargames", icon: "🎯" },
    { path: "/dashboard/models", name: "Models", icon: "🤖" },
    { path: "/dashboard/redteaming", name: "RedTeaming", icon: "🛡️" },
  ];

  return (
    <>
      {isMobile && !isCollapsed && <div className="sidebar-backdrop" />}
      <aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobile ? "mobile" : ""}`}
      >
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!isCollapsed && (
                <span className="sidebar-text">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
