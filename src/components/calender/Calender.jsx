import React, { useState } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { motion } from "framer-motion";
import EventHighlightBox from "./EventHighlightBox";
import EventTag from "./EventTag";
import CalenderGrid from "./CalenderGrid";
import events from "../../data/events.json";
import { useOutletContext } from "react-router-dom";
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
  const { darkMode } = useOutletContext();

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
        <motion.div
          key={day.format("DD-MM-YYYY")}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{
            scale: 1.05,
            rotate: 0.5,
            y: -4,
            transition: { type: "spring", stiffness: 200, damping: 15 },
          }}
          className={`border p-2 h-24 overflow-hidden relative rounded-md text-xs cursor-pointer transition duration-300 transform
            ${
              day.isSame(today, "day")
                ? darkMode
                  ? "bg-gradient-to-br from-[#0ff]/20 to-[#ff0]/20 border-2 border-[#0ff] shadow-[0_0_10px_#0ff,0_0_20px_#ff0] backdrop-blur-sm bg-opacity-30 text-[#39FF14] "
                  : "bg-gradient-to-br from-pink-100/30 to-pink-200/30 border-2 border-pink-400 shadow-inner shadow-pink-200 backdrop-blur-md text-pink-700"
                : darkMode
                ? "bg-black border-[#333] text-[#39FF14] hover:bg-[#111] hover:shadow-[0_0_10px_#FF00FF,0_0_20px_#00f0ff]"
                : "bg-white border-gray-300 text-black hover:bg-pink-100 hover:shadow-md"
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
        </motion.div>
      );

      day = day.add(1, "day");
    }

    rows.push(
      <motion.div
        className="grid grid-cols-7 gap-2"
        key={day.format("DD-MM-YYYY") + "row"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {days}
      </motion.div>
    );
    days = [];
  }

  return (
    <div
      className={`min-h-screen w-full flex ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        {/* Highlight Box for Events */}
        <EventHighlightBox
          darkMode={darkMode}
          currentDate={currentDate}
          today={today}
        />

        {/* Calendar Container */}
        <CalenderGrid
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          rows={rows}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
};

export default Calendar;
