import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const location = useLocation();

  const getPageName = (path) => {
    switch (path) {
      case "/":
        return "Home";
      case "/wargames":
        return "Wargames";
      case "/models":
        return "Models";
      case "/redteaming":
        return "RedTeaming";
      default:
        return "Page";
    }
  };

  const currentPage = getPageName(location.pathname);
  const isHome = location.pathname === "/";

  return (
    <nav className="breadcrumbs">
      <Link to="/" className="breadcrumb-link">
        Home
      </Link>
      {!isHome && (
        <>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{currentPage}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
