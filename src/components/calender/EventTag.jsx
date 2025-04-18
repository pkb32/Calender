import React from "react";

const EventTag = ({ event, isConflict, conflicts, darkMode }) => {
  {    /* Check if the event conflicts with any other events */  }
  const tooltip = isConflict
    ? `⚠️ Conflict with ${conflicts.map((c) => c.title).join(", ")}`
    : "";
  {    /* Set the background color and text color based on whether the event conflicts or not */  }
  const backgroundColor = /^#[0-9A-F]{6}$/i.test(event.color) // Check if the color is a valid hex code
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
    // Render the event tag
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
      {event.title} {isConflict && "⚠️"}{" "}
      {/* Add a warning icon if the event conflicts inside the calendar */}
    </div>
  );
};

export default EventTag;
