import React from "react";
import { useOutletContext } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";

//dummy dataset only for example
const notifications = [
  {
    id: 1,
    title: "New Event Added",
    message: "The AI & Robotics Workshop has been scheduled for 22nd April.",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Schedule Updated",
    message: "Your event 'Mine Safety Talk' has been rescheduled to 3 PM.",
    time: "Yesterday",
  },
];

const NotificationController = () => {
  const { darkMode } = useOutletContext(); // Access darkMode from the context

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        darkMode ? "bg-black text-[#39FF14]" : "bg-white text-black"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MdNotificationsActive className="text-3xl" />
          Notifications
        </h1>

        <div className="space-y-4">
          {notifications.map((note) => ( //map to load the notifications
            <div
              key={note.id}
              className={`rounded-lg p-4 transition-all ${
                darkMode
                  ? "bg-white/10 border border-white/20 shadow-md hover:shadow-[#39FF14]/50"
                  : "bg-pink-50 border border-pink-200 shadow hover:shadow-pink-300"
              }`}
              style={
                darkMode
                  ? {
                      boxShadow: "0 0 10px rgba(57, 255, 20, 0.3)",
                      backdropFilter: "blur(4px)",
                    }
                  : {}
              }
            >
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-sm">{note.message}</p>
              <span className="text-xs opacity-60">{note.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationController;
