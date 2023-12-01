import React, { useState } from "react";
import "./PostOptions.scss";

function PostOptions({ open, setOptionOpen ,setScheduleDate }) {
  const [pickedDate, setPickedDate] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  function getDateTimeData() {
    if (pickedDate || pickedTime) {
      const dateTimeString = pickedDate + "T" + pickedTime;
      const dateTime = new Date(dateTimeString);
      setScheduleDate(dateTime);
      setOptionOpen(prev => !prev)
    }
  }

  return (
    <div
      className="post-option-dropdown"
      style={{ display: open ? "block" : "none" }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>Post Options</h2>
      <label>Schedule Publication</label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "1.5rem",
        }}
      >
        <input
          type="date"
          min={today}
          onChange={(e) => setPickedDate(e.target.value)}
        />
        <input type="time" onChange={(e) => setPickedTime(e.target.value)} />
      </div>
      <button type="button" onClick={getDateTimeData}>
        Done
      </button>
    </div>
  );
}

export default PostOptions;
