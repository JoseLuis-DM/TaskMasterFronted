import React, { useEffect, useState } from "react";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks([
      { id: 1, title: "Tarea 1", status: "Pendiente" },
      { id: 2, title: "Tarea 2", status: "Completada" },
    ]);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas aún</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              {t.title} - {t.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardPage;
