import React from "react";
import "./Timer.css"; // External CSS

export default function Timer({ timeLeft }) {
  return (
    <div className="timer-container">
      <div
        className="timer-progress"
        style={{
          animation: `progress ${timeLeft}s linear forwards`,
        }}
      ></div>
    </div>
  );
}
