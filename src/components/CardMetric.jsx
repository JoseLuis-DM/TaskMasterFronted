import React from "react";

function CardMetric({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "#0B1A2F",
        border: "2px solid #A3BE8C",
        borderRadius: "8px",
        padding: "1rem",
        width: "200px",
        textAlign: "center",
      }}
    >
      <h4 style={{ color: "#A3BE8C" }}>{title}</h4>
      <p style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>{value}</p>
    </div>
  );
}

export default CardMetric;
