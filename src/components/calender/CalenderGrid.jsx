import React from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

const CalendarGrid = ({ currentDate, setCurrentDate, rows, darkMode }) => {
  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div
      className={`relative p-4 rounded-lg w-full overflow-hidden transition-all duration-500 shadow-xl backdrop-blur-md ${
        darkMode ? "bg-black/40 text-white" : "bg-white/30 text-gray-900"
      }`}
      style={
        darkMode
          ? {
              boxShadow: `
                0 0 10px rgba(0, 240, 255, 0.5),
                0 0 90px rgba(255, 0, 255, 0.4),
                0 0 10px rgba(255, 20, 147, 0.4)
              `,
            }
          : {
              border: "1px solid #f472b6",
            }
      }
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className={`text-4xl transition ${
            darkMode ? "text-pink-300 hover:text-pink-100" : "text-pink-600 hover:text-pink-800"
          }`}
        >
          <HiArrowCircleLeft />
        </button>
        <h2 className="text-3xl font-bold tracking-wide neon-text">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={handleNextMonth}
          className={`text-4xl transition ${
            darkMode ? "text-pink-300 hover:text-pink-100" : "text-pink-600 hover:text-pink-800"
          }`}
        >
          <HiArrowCircleRight />
        </button>
      </div>

      {/* Days of Week */}
      <div
        className={`grid grid-cols-7 text-center font-semibold text-sm mb-4 uppercase ${
          darkMode ? "text-pink-400" : "text-pink-600"
        }`}
      >
        {"SMTWTFS".split("").map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="space-y-2 p-2 sm:overflow-x-auto md:overflow-x-auto">
        {rows}
      </div>
    </div>
  );
};

export default CalendarGrid;
