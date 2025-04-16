import React from "react";

const EventTag = ({ event, isConflict, conflicts, darkMode }) => {
  const tooltip = isConflict
    ? `⚠️ Conflict with ${conflicts.map((c) => c.title).join(", ")}`
    : "";

  const backgroundColor = /^#[0-9A-F]{6}$/i.test(event.color)
    ? event.color
    : "#39FF14";

  const color = darkMode
    ? isConflict
      ? "#ff4b4b"
      : "white"
    : isConflict
    ? "#b91c1c"
    : "#1e1e1e";

  const border = isConflict ? "1px solid #dc2626" : "none";
  const textShadow = darkMode ? "0 0 5px #0ff" : "none";

  return (
    <div
      className="px-1 py-0.5 rounded truncate font-semibold"
      title={tooltip}
      style={{
        backgroundColor,
        color,
        border,
        textShadow,
      }}
    >
      {event.title} {isConflict && "⚠️"}
    </div>
  );
};


export default EventTag;
