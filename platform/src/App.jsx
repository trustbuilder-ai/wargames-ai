import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import WargamesLayout from "./layouts/WargamesLayout";
import Home from "./pages/Home";
import Wargames from "./pages/Wargames";
import Models from "./pages/Models";
import RedTeaming from "./pages/RedTeaming";
import Dashboard from "./pages/Dashboard";
import WargamesChallenge from "./pages/wargames/WargamesChallenge";
import Callback from "./pages/auth/Callback";
import { setupApiClient } from "./lib/api-client";
import "./App.css";

function App() {
  // Initialize API client with authentication on app load
  useEffect(() => {
    setupApiClient();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route element={<RootLayout />}>
          {/* Redirect from root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard routes with sidebar */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="wargames" element={<Wargames />} />
            <Route path="models" element={<Models />} />
            <Route path="redteaming" element={<RedTeaming />} />
          </Route>
          
          {/* Wargames routes with minimal layout */}
          <Route path="/wargames" element={<WargamesLayout />}>
            <Route path="challenge" element={<WargamesChallenge />} />
          </Route>
          
          {/* Auth routes without sidebar */}
          <Route path="/auth/callback" element={<Callback />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
