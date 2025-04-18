import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBell, FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdEvent } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  {    /* CSS classes */  }
  const sectionTitleClass = darkMode
    ? "text-pink-300 uppercase text-xs px-4 pt-4 pb-2 tracking-wider"
    : "text-pink-600 uppercase text-xs px-4 pt-4 pb-2 tracking-wider";

  const activeClass = "bg-pink-600 text-white shadow-[0_0_10px_#FF00FF]";
  const baseClass = darkMode
    ? "text-white hover:bg-gray-700"
    : "text-gray-800 hover:bg-gray-200";

  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-2 rounded cursor-pointer font-medium transition ${
      isActive ? activeClass : baseClass
    }`;

  return (
    <>
      {/* Mobile Toggle Button (shows only when sidebar is closed) */}
      {!isOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50 opacity-80">
          <button
            onClick={() => setIsOpen(true)}
            className={`p-2 rounded-md text-xl ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <FaBars />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 flex flex-col justify-between p-4 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:flex
        ${
          darkMode
            ? "bg-black text-white lg:bg-black"
            : "bg-white text-gray-800 lg:bg-white"
        }
        ${
          isOpen
            ? "backdrop-blur-lg bg-white/30 dark:bg-black/30 border border-white/20 shadow-xl"
            : ""
        }
      `}
      >
        <div>
          {/* Top Header with Close Button on Mobile */}
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="text-2xl font-bold">Admin Panel</div>
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-md text-xl ${
                  darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                }`}
              >
                <ImCross />
              </button>
            </div>
          </div>

          {/* Home */}
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="mr-3" />
            Home
          </NavLink>

          {/* Manage */}
          <div className={sectionTitleClass}>Manage</div>
          <NavLink
            to="/events"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            <MdEvent className="mr-3" />
            Events
          </NavLink>

          {/* More */}
          <div className={sectionTitleClass}>More</div>
          <NavLink
            to="/notifications"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            <FaBell className="mr-3" />
            Notification
          </NavLink>

          {/* Dark Mode Toggle */}
          <div className="mt-6 px-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={!darkMode}
                  onChange={() => setDarkMode((prev) => !prev)}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                    darkMode ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-black rounded-full transition-all duration-300 ${
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
        </div>

        {/* Bottom User Info */}
        <div className="flex items-center space-x-3 border-t pt-4 px-4">
          <img
            src="https://media.images.yourquote.in/user/large/0/0/3/481/9kwD1507.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="text-sm font-semibold">Prayash</div>
            <div className="text-xs text-gray-400">View Profile</div>
          </div>
          <HiOutlineChevronDown className="text-gray-400" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
