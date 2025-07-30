import React from "react";
import { Outlet } from "react-router-dom";
import "./WargamesLayout.css";

const WargamesLayout = () => {
  return (
    <div className="wargames-layout">
      <Outlet />
    </div>
  );
};

export default WargamesLayout;