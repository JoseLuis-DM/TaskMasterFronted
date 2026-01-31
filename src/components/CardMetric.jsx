import React from "react";

function CardMetric({ title, value }) {
  return (
    <div className="card-metric">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

export default CardMetric;
