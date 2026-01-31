import React from "react";

function TaskCard({ tarea }) {
  return (
    <div className="task-card">
      <h3>{tarea.titulo}</h3>
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
