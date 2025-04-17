import React from "react";
import dayjs from "dayjs";
import events from "../../data/events.json"; 

const doesOverlap = (event1, event2) => {
  const start1 = dayjs(`${event1.date} ${event1.time}`);
  const end1 = start1.add(parseInt(event1.duration), "hour");
  const start2 = dayjs(`${event2.date} ${event2.time}`);
  const end2 = start2.add(parseInt(event2.duration), "hour");

  return start1.isBefore(end2) && end1.isAfter(start2);
};

const EventHighlightBox = ({ darkMode, currentDate, today }) => {
  if (!events || events.length === 0) {
    return (
      <div
        className={`rounded-lg p-6 mb-4 border ${
          darkMode
            ? "bg-gray-800 border-pink-400 shadow-[0_0_15px_#FF00FF]"
            : "bg-gray-100 border-pink-300"
        }`}
      >
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-pink-400" : "text-pink-600"}`}>
          Event List
        </h2>
        <p className="text-gray-400 text-sm">No events available.</p>
      </div>
    );
  }

  const upcomingEvents = events
    .filter((event) => {
      const eventDateTime = dayjs(`${event.date} ${event.time}`);
      return (
        eventDateTime.isSameOrAfter(today.startOf("day")) &&
        eventDateTime.isSame(currentDate, "month")
      );
    })
    .sort((a, b) => dayjs(`${a.date} ${a.time}`).unix() - dayjs(`${b.date} ${b.time}`).unix());

  return (
    <div
  className={`relative p-4 rounded-lg w-full overflow-hidden transition-all duration-500 shadow-xl backdrop-blur-md mb-6 ${
    darkMode ? "bg-black/40 text-white" : "bg-white/30 text-gray-900"
  }`}
  style={
    darkMode
      ? {
          boxShadow: `
            0 0 10px rgba(0, 240, 255, 0.5),
            0 0 20px rgba(255, 0, 255, 0.4),
            0 0 50px rgba(255, 20, 147, 0.4)
          `,
        }
      :{
        border: "1px solid #f472b6", 
      }
  }
>
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-pink-400" : "text-pink-600"}`}>
        Event List
      </h2>

      <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-400 text-sm">No upcoming events</p>
        ) : (
          upcomingEvents.map((event) => {
            const eventDateTime = dayjs(`${event.date} ${event.time}`);
            const sameDayEvents = events.filter((e) => e.date === event.date);

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
                      : "bg-gray-800 border-pink-400 hover:bg-pink-700/30 shadow-[0_0_10px_#FF00FF]/60"
                    : isConflict
                    ? "bg-red-100 border-red-400 shadow"
                    : "bg-white border-pink-300 hover:bg-pink-200"
                }`}
                title={
                  isConflict
                    ? `⚠️ Conflict with ${conflicts.map((c) => c.title).join(", ")}`
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
                      : event.date === dayjs().format("YYYY-MM-DD")
                      ? "#00bfff"
                      : darkMode
                      ? "#39FF14"
                      : "#db2777",
                  }}
                >
                  {event.date === dayjs().format("YYYY-MM-DD") ? (
                    <span className="px-2 py-0.5 text-[10px] bg-[#00bfff]/20 text-[#00bfff] border border-[#00bfff] rounded-full font-bold tracking-wide shadow-[0_0_6px_#00bfff]">
                      Today
                    </span>
                  ) : (
                    "Upcoming"
                  )}
                  {isConflict && " ⚠️"}
                </p>

                <h3 className="text-lg font-semibold">
                  {event.title}{" "}
                  {isConflict && (
                    <span className="text-red-500 text-sm ml-1">(Time Clashing)</span>
                  )}
                </h3>
                <p className="text-sm">
                  🕒 {eventDateTime.format("ddd, MMM D · h:mm A")} ({event.duration})
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EventHighlightBox;
