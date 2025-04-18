import React from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { motion } from "framer-motion";

const CalendarGrid = ({ currentDate, setCurrentDate, rows, darkMode }) => {
  const handlePrevMonth = () =>
  setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div 
    className="relative p-[2px] rounded-xl overflow-hidden"
    style={
      darkMode
        ? {
            boxShadow: `
              0 0 50px rgba(255, 20, 147, 0.4)
            `,
          }
        :{
          border: "1px solid #f472b6", 
        }
    }
    >
      {/* Blurred animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl z-0 blur-md"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: darkMode
            ? "linear-gradient(135deg, #0ff, #f0f, #ff0, #0ff)"
            : "linear-gradient(135deg, #fbcfe8, #f472b6, #facc15, #fbcfe8)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Calendar container */}
      <div
        className={`relative z-10 p-4 rounded-xl backdrop-blur-md shadow-xl transition-all duration-500 ${
          darkMode
            ? "bg-black/50 text-white"
            : "bg-white/60 text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className={`text-4xl transition ${
              darkMode
                ? "text-pink-300 hover:text-pink-100"
                : "text-pink-600 hover:text-pink-800"
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
              darkMode
                ? "text-pink-300 hover:text-pink-100"
                : "text-pink-600 hover:text-pink-800"
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
    </div>
  );
};

export default CalendarGrid;
