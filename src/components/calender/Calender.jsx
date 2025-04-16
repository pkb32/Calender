import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import events from "../../data/events.json";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

import "tailwindcss/tailwind.css";

dayjs.extend(isSameOrAfter);

const doesOverlap = (event, otherEvent) => {
  const start1 = dayjs(`${event.date} ${event.time}`);
  const end1 = start1.add(parseInt(event.duration), "hour");
  const start2 = dayjs(`${otherEvent.date} ${otherEvent.time}`);
  const end2 = start2.add(parseInt(otherEvent.duration), "hour");
  return start1.isBefore(end2) && start2.isBefore(end1);
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [darkMode, setDarkMode] = useState(true);

  const today = dayjs();
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const dateFormat = "DD";
  const rows = [];
  let days = [];
  let day = startDate;

  while (day.isBefore(endDate, "day")) {
    for (let i = 0; i < 7; i++) {
      const dayEvents = events.filter((e) => dayjs(e.date).isSame(day, "day"));
      days.push(
        <div
          key={day.format("DD-MM-YYYY")}
          className={`border p-2 h-24 overflow-hidden relative rounded-md backdrop-blur-md text-xs ${
            day.isSame(today, "day")
              ? "bg-gradient-to-br from-[#0ff]/20 to-[#ff0]/20 border-[#0ff] shadow-inner shadow-[#0ff]"
              : darkMode
              ? "bg-black border-[#333] text-[#39FF14]"
              : "bg-white border-gray-300 text-black"
          }`}
        >
          <div className="text-sm font-semibold mb-[3px]">{day.format(dateFormat)}</div>
<div className="absolute top-8 left-1 right-1 space-y-1 overflow-y-auto max-h-[4.5rem] pr-1">

            {dayEvents.map((event, i) => {
              const conflicts = dayEvents.filter(
                (e) => e.id !== event.id && doesOverlap(event, e)
              );
              const isConflict = conflicts.length > 0;
              return (
                <div
                  key={`${event.id}-${i}`}
                  className="px-1 py-0.5 rounded truncate font-medium"
                  title={
                    isConflict
                      ? `⚠️ Conflict with ${conflicts
                          .map((c) => c.title)
                          .join(", ")}`
                      : ""
                  }
                  style={{
                    backgroundColor: /^#[0-9A-F]{6}$/i.test(event.color)
                      ? event.color
                      : "#39FF14", // neon green default
                    color: isConflict ? "#ff0000" : "#0ff", // cyan or red for conflict
                    border: isConflict ? "1px solid #ff0000" : "1px solid #0ff", // electric blue border
                    boxShadow: "0 0 6px rgba(0,255,255,0.7)", // glow
                  }}
                >
                  {event.title} {isConflict && "⚠️"}
                </div>
              );
            })}
          </div>
        </div>
      );
      day = day.add(1, "day");
    }
    rows.push(
      <div
        className="grid grid-cols-7 gap-2"
        key={day.format("DD-MM-YYYY") + "row"}
      >
        {days}
      </div>
    );
    days = [];
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <div
      className={`min-h-screen w-full flex ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 p-4 hidden md:block shadow-md ${
          darkMode
            ? "bg-gray-800 text-white "
            : "bg-gray-100 text-black "
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Highlight Box */}
        <div
          className={`rounded-lg shadow-md p-6 mb-4 border ${
            darkMode
              ? "bg-gray-800 border-pink-400 shadow-[0_0_20px_#FF00FF]"
              : "bg-gray-100 border-pink-300 "
          }`}
        >
          <h2
            className={`text-xl font-bold mb-4 ${
              darkMode ? "text-pink-400" : "text-pink-600"
            }`}
          >
            Upcoming & Today’s Events
          </h2>
          <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
            {events
              .filter((event) => {
                const eventDateTime = dayjs(`${event.date} ${event.time}`);
                return (
                  eventDateTime.isSameOrAfter(today.startOf("day")) &&
                  eventDateTime.isSame(currentDate, "month")
                );
              })
              .sort(
                (a, b) =>
                  dayjs(`${a.date} ${a.time}`).unix() -
                  dayjs(`${b.date} ${b.time}`).unix()
              )
              .map((event) => {
                const eventDateTime = dayjs(`${event.date} ${event.time}`);
                const sameDayEvents = events.filter(
                  (e) => e.date === event.date
                );
                const conflicts = sameDayEvents.filter(
                  (e) => e.id !== event.id && doesOverlap(event, e)
                );
                const isConflict = conflicts.length > 0;

                return (
                  <div
                    key={event.id}
                    className={`border rounded-md p-3 transition relative ${
                      darkMode
                        ? isConflict
                          ? "bg-red-800/30 border-red-500 shadow-md"
                          : "bg-gray-700 border-pink-500 hover:bg-pink-700/30"
                        : isConflict
                        ? "bg-red-100 border-red-400 shadow"
                        : "bg-white border-pink-300 hover:bg-pink-200"
                    }`}
                    title={
                      isConflict
                        ? `⚠️ Conflict with ${conflicts
                            .map((c) => c.title)
                            .join(", ")}`
                        : ""
                    }
                  >
                    <p
                      className="font-medium text-sm mb-1"
                      style={{
                        color: isConflict
                          ? darkMode
                            ? "#ff4d4d"
                            : "#b91c1c"
                          : darkMode
                          ? "#39FF14"
                          : "#db2777",
                      }}
                    >
                      {event.date === dayjs().format("YYYY-MM-DD")
                        ? "Today"
                        : "Upcoming"}
                      {isConflict && " ⚠️"}
                    </p>
                    <h3 className="text-lg font-semibold">
                      {event.title}{" "}
                      {isConflict && (
                        <span className="text-red-500 text-sm ml-1">
                          (Time Clash)
                        </span>
                      )}
                    </h3>
                    <p className="text-sm">
                      🕒 {eventDateTime.format("ddd, MMM D · h:mm A")} (
                      {event.duration})
                    </p>
                  </div>
                );
              })}

            {events.filter((event) =>
              dayjs(`${event.date} ${event.time}`).isSameOrAfter(
                today,
                "minute"
              )
            ).length === 0 && (
              <p className="text-gray-400 text-sm">No upcoming events</p>
            )}
          </div>
        </div>

        {/* Calendar Container */}
        <div
          className={`rounded-lg shadow p-4 w-full border ${
            darkMode
              ? "bg-gray-800 border-pink-400 shadow-[0_0_20px_#FF00FF]"
              : "bg-white border-pink-300 "
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              className={`text-4xl ${
                darkMode
                  ? "text-pink-400 hover:text-pink-200"
                  : "text-pink-600 hover:text-pink-800"
              }`}
            >
              <HiArrowCircleLeft />
            </button>
            <h2 className="text-2xl font-bold">
              {currentDate.format("MMMM YYYY")}
            </h2>
            <button
              onClick={handleNextMonth}
              className={`text-4xl ${
                darkMode
                  ? "text-pink-400 hover:text-pink-200"
                  : "text-pink-600 hover:text-pink-800"
              }`}
            >
              <HiArrowCircleRight />
            </button>
          </div>

          {/* Weekdays */}
          <div
            className={`grid grid-cols-7 text-center font-bold mb-2 ${
              darkMode ? "text-pink-300" : "text-pink-600"
            }`}
          >
            {"SMTWTFS".split("").map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">{rows}</div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
