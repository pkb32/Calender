import React from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

const CalendarGrid = ({
  currentDate,
  setCurrentDate,
  rows,
  darkMode,
}) => {
  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div
      className={`rounded-lg shadow p-4 w-full border ${
        darkMode
          ? "bg-gray-800 border-pink-400 shadow-[0_0_20px_#FF00FF]"
          : "bg-white border-pink-300 "
      }`}
    >
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

      <div
        className={`grid grid-cols-7 text-center font-bold mb-2 ${
          darkMode ? "text-pink-300" : "text-pink-600"
        }`}
      >
        {"SMTWTFS".split("").map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="space-y-2">{rows}</div>
    </div>
  );
};

export default CalendarGrid;
