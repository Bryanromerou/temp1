import React from "react";
import GlobalNavBar from "app/components/GlobalNavBar";
import Dashboard from "app/containers/Dashboard";
import AdminConsole from "app/containers/AdminConsole";
import TeamGuide from "app/containers/TeamGuide";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AdminConsole" element={<AdminConsole />} />
        <Route path="/TeamGuide" element={<TeamGuide />} />
        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
