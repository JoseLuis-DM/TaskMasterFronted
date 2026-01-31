import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMetricas } from "../services/dashboardService";
import TaskCard from "../components/TaskCard";
import CardMetric from "../components/CardMetric";

function DashboardPage() {
  const [tareas, setTareas] = useState([]);
  const [metricas, setMetricas] = useState({
    totalTareas: 0,
    completadas: 0,
    pendientes: 0,
  });
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const data = await getMetricas(token);
        
        setTareas(data.tareasRecientes || []);
        
        setMetricas({
          totalTareas: data.totalTareas || 0,
          completadas: data.tareasCompletadas || 0,
          pendientes: data.tareasPendientes || 0,
        });

        setCategorias(data.bloquesPorCategoria || []);
      } catch (err) {
        console.error("Error cargando datos:", err);

        if (err.response?.status === 403) {
          localStorage.removeItem("jwt");
          localStorage.removeItem("rol");
          navigate("/");
        }
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#1B263B", minHeight: "100vh", color: "#FFF" }}>
      <h1 style={{ color: "#A3BE8C" }}>Dashboard</h1>

      {rol === "ADMIN" && (
        <div style={{ padding: "1rem", border: "2px solid #A3BE8C", borderRadius: "8px", marginBottom: "1rem", backgroundColor: "#0B1A2F" }}>
          <h2>Panel Admin</h2>
          <p>Puedes ver todas las tareas y usuarios.</p>
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <CardMetric title="Tareas Totales" value={metricas.totalTareas} />
        <CardMetric title="Tareas Completadas" value={metricas.completadas} />
        <CardMetric title="Tareas Pendientes" value={metricas.pendientes} />
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {categorias.map((cat) => (
          <CardMetric key={cat.id} title={cat.nombre} value={cat.totalTareas} />
        ))}
      </div>

      <h2 style={{ marginTop: "2rem" }}>Tus Tareas Recientes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {tareas.length === 0 ? (
          <p>No hay tareas disponibles.</p>
        ) : (
          tareas.map((tarea) => <TaskCard key={tarea.id} tarea={tarea} />)
        )}
      </div>
    </div>
  );
}

export default DashboardPage;