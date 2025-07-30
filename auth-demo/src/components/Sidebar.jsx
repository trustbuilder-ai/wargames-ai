import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, isMobile }) => {
  const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: "📊" },
    { path: "/wargames", name: "Wargames", icon: "🎯" },
    { path: "/models", name: "Models", icon: "🤖" },
    { path: "/redteaming", name: "RedTeaming", icon: "🛡️" },
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
