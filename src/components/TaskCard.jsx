import React from "react";

function TaskCard({ tarea }) {
  return (
    <div
      style={{
        backgroundColor: "#0B1A2F",
        border: "2px solid #A3BE8C",
        borderRadius: "8px",
        padding: "1rem",
        width: "250px",
      }}
    >
      <h3 style={{ color: "#A3BE8C" }}>{tarea.titulo}</h3>
      <p>{tarea.descripcion}</p>
      <p>
        Estado: <strong>{tarea.estado}</strong>
      </p>
      <p>
        Categoria: <strong>{tarea.categoria}</strong>
      </p>
    </div>
  );
}

export default TaskCard;
