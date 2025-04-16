import React, { useState } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import "tailwindcss/tailwind.css";
import Sidebar from "./Sidebar";
import EventHighlightBox from "./EventHighlightBox";
import EventTag from "./EventTag";
import events from "../../data/events.json";
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
      // Define dayEvents for the current day in the loop
      const dayEvents = events.filter((e) => dayjs(e.date).isSame(day, "day"));

      days.push(
        <div
          key={day.format("DD-MM-YYYY")}
          className={`border p-2 h-24 overflow-hidden relative rounded-md text-xs ${
            day.isSame(today, "day")
              ? darkMode
                ? "bg-gradient-to-br from-[#0ff]/20 to-[#ff0]/20 border-2 border-[#0ff] shadow-[0_0_10px_#0ff,0_0_20px_#ff0] backdrop-blur-sm bg-opacity-30 text-[#39FF14]"
                : "bg-gradient-to-br from-pink-100/30 to-pink-200/30 border-2 border-pink-400 shadow-inner shadow-pink-200 backdrop-blur-md text-pink-700"
              : darkMode
              ? "bg-black border-[#333] text-[#39FF14]"
              : "bg-white border-gray-300 text-black"
          }`}
        >
          <div className="text-sm font-semibold mb-[3px]">
            {day.format(dateFormat)}
          </div>
          <div className="absolute top-8 left-1 right-1 space-y-1 overflow-y-auto max-h-[3.5rem] pr-1">
            {dayEvents.map((event, i) => {
              const conflicts = dayEvents.filter(
                (e) => e.id !== event.id && doesOverlap(event, e)
              );
              return (
                <EventTag
                  key={`${event.id}-${i}`}
                  event={event}
                  isConflict={conflicts.length > 0}
                  conflicts={conflicts}
                  darkMode={darkMode}
                />
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
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Highlight Box for Events */}
        <EventHighlightBox
          darkMode={darkMode}
          currentDate={currentDate}
          today={today}
        />

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
