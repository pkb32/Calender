import React, { useEffect, useState } from "react";
import events from "../../data/events.json";
import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";

function EventsController() {
  const { darkMode } = useOutletContext();
  const [groupedEvents, setGroupedEvents] = useState({});

  useEffect(() => {
    // Sort events by date and time
    const sortedEvents = [...events].sort(
      (a, b) =>
        dayjs(`${a.date} ${a.time}`).unix() -
        dayjs(`${b.date} ${b.time}`).unix()
    );
    // Group events by month
    const grouped = sortedEvents.reduce((acc, event) => {
      const monthKey = dayjs(event.date, "YYYY-MM-DD").format("MMMM YYYY");
      if (!acc[monthKey]) acc[monthKey] = [];
      acc[monthKey].push(event);
      return acc;
    }, {});

    setGroupedEvents(grouped); // Update the state
  }, []);

  return (
    <div
      className={`min-h-screen p-6 font-sans transition-colors duration-300 ${
        darkMode ? "bg-black text-[#FF5F1F]" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-8 text-center">
        Monthly Event Schedule
      </h1>
      {/* Display events grouped by month */}
      {Object.entries(groupedEvents).map(([month, events]) => (
        <div key={month} className="mb-10">
          <h2
            className={`text-xl font-semibold mb-4 pb-1 border-b ${
              darkMode ? "border-[#39FF14]" : "border-gray-400"
            }`}
          >
            {month}
          </h2>

          <div className="overflow-x-auto ">
            <table
              className={`min-w-full  table-fixed border-separate  border-spacing-y-3 ${
                darkMode
                  ? "bg-transparent  text-[#FF5F1F]"
                  : "bg-gray-100 text-black"
              }`}
            >
              {/* Tablular Representation of data */}
              <thead>
                <tr
                  className={`text-left  ${
                    darkMode
                      ? "border-b border-[#39FF14]"
                      : "border-b border-gray-300"
                  }`}
                >
                  <th className="py-2 px-4 w-1/3">Title</th>
                  <th className="py-2 px-4 w-1/4">Date</th>
                  <th className="py-2 px-4 w-1/4 ">Time</th>
                  <th className="py-2 px-4 w-1/6 hidden lg:table-cell">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className={`transition rounded    ${
                      darkMode
                        ? "backdrop-blur-md bg-white/10 text-[#39FF14] border border-white/10 "
                        : "hover:bg-gray-200 border border-gray-200"
                    }`}
                    style={
                      darkMode
                        ? {
                            boxShadow: `0 0 10px ${event.color || "#39FF14"}`,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                          }
                        : {}
                    }
                  >
                    <td className="py-2 px-4 w-1/3 font-medium ">
                      {event.title}
                    </td>
                    <td className="py-2 px-4 w-1/4">
                      {dayjs(event.date, "YYYY-MM-DD").format("ddd, MMM D")}
                    </td>
                    <td className="py-2 px-4 w-1/4">
                      {dayjs(
                        `${event.date} ${event.time}`,
                        "YYYY-MM-DD HH:mm"
                      ).format("h:mm A")}
                    </td>
                    <td className="py-2 px-4 w-1/6 hidden lg:table-cell">
                      {event.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventsController;
