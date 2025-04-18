import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/calender/Sidebar";

const Layout = () => { // Layout component
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen w-full flex ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar on every page */}
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <Outlet context={{ darkMode, setDarkMode }} />
      </main>
    </div>
  );
};

export default Layout;
