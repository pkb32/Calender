import React from "react";

const Sidebar = ({ darkMode, setDarkMode }) => {
  return (
    <aside
        className={`w-64 p-4 hidden md:block shadow-md ${
          darkMode ? "bg-gray-800 text-white " : "bg-gray-100 text-black "
        }`}
      >
        <h2 className="text-xl font-bold mb-4"> Calendar</h2>
        <ul className="space-y-2">
          <li className="font-medium">Dashboard</li>
          <li className="font-medium">Events</li>
          <li className="font-medium">Members</li>
          <li className="font-medium">Settings</li>
        </ul>
        <div className="mt-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={!darkMode}
                onChange={() => setDarkMode((prev) => !prev)}
                className="sr-only"
              />
              <div
                className={`toggle-container w-10 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                  darkMode ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`toggle-circle w-4 h-4 bg-black rounded-full transition-all duration-300 ${
                    darkMode ? "transform translate-x-4" : ""
                  }`}
                ></div>
              </div>
            </div>
            <span className="text-sm">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </label>
        </div>
      </aside>

  );
};

export default Sidebar;
