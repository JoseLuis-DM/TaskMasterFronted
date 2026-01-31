import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMetricas } from "../services/dashboardService";
import TaskCard from "../components/TaskCard";
import CardMetric from "../components/CardMetric";
import CircleChart from "../components/CircleChart";
import { getMyProfile } from "../services/usuarioService";

function DashboardPage() {
   const [usuario, setUsuario] = useState({
    nombre: "",
    apellidos: ""
  });
  const [tareas, setTareas] = useState([]);
  const [metricas, setMetricas] = useState({
    totalTareas: 0,
    completadas: 0,
    pendientes: 0,
    atrasadas: 0,
    porcentajesPorCategoria: [],
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

        const response = await getMyProfile();
        const user = response.data.data;

        setUsuario({
          nombre: user.nombre ?? "",
        });

        setTareas(data.tareasRecientes || []);

        setMetricas({
          totalTareas: data.totalTareas || 0,
          completadas: data.tareasCompletadas || 0,
          pendientes: data.tareasPendientes || 0,
          porcentajesAtrasadas: data.porcentajesAtrasadas || [],
          porcentajesPorCategoria: data.porcentajesPorCategoria || [],
        });

        const handleEditar = () => {
        alert("Funcionalidad de editar usuario aún no implementada.");
        }

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

  const porcentajeCompletadas = metricas.totalTareas
    ? (metricas.completadas / metricas.totalTareas) * 100
    : 0;
  const porcentajePendientes = metricas.totalTareas
    ? (metricas.pendientes / metricas.totalTareas) * 100
    : 0;

  return (
    <div>
      <header>
      <h1 className="header-title">TaskMaster</h1>

      <div className="header-center">
        <p className="header-welcome">Bienvenido</p>
        <p className="header-username">{usuario.nombre}</p>
      </div>

      <button className="header-edit-btn" onClick={() => navigate("/perfil")}>
        Editar Perfil
      </button>
    </header>

      <main
        style={{
          padding: "2rem",
          backgroundColor: "#C7D2D4",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <button
            className="button-primary"
            onClick={() => navigate("/tareas")}
          >
            Gestionar Tareas
          </button>
        </div>

        {rol === "ADMIN" && (
          <div className="admin-panel">
            <h2>Panel Admin</h2>
            <p>Puedes ver todas las tareas y usuarios.</p>
          </div>
        )}

        <div className="metrics-container">
          <CardMetric title="Tareas Totales" value={metricas.totalTareas} />
          <CardMetric title="Tareas Completadas" value={metricas.completadas} />
          <CardMetric title="Tareas Pendientes" value={metricas.pendientes} />
        </div>

        <h2>Tus Tareas Recientes</h2>
        <div className="tasks-container">
          {tareas.length === 0 ? (
            <p>No hay tareas disponibles.</p>
          ) : (
            tareas.map((tarea) => (
              <div key={tarea.id} className="task-card-wrapper">
                <TaskCard tarea={tarea} />
              </div>
            ))
          )}
        </div>

        <h2>Porcentaje por Categoría</h2>
        <div className="categories-container">
          {metricas.porcentajesPorCategoria?.map((cat) => (
            <div key={cat.nombre} className="category-card">
              <h4>{cat.nombre}</h4>
              <p>{cat.porcentaje.toFixed(1)}%</p>
              <div
                style={{
                  height: "6px",
                  backgroundColor: "#C7D2D4",
                  borderRadius: "3px",
                }}
              >
                <div
                  style={{
                    width: `${cat.porcentaje}%`,
                    height: "6px",
                    backgroundColor: "#112E40",
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <h2>Progreso</h2>
        <div className="progress-container">
          <CircleChart
            label="Completadas"
            percentage={porcentajeCompletadas}
            color="#6CD96A"
          />
          <CircleChart
            label="Pendientes"
            percentage={porcentajePendientes}
            color="#003366"
          />
          <CircleChart
            label="Atrasadas"
            percentage={metricas.porcentajesAtrasadas}
            color="#FF5733"
          />
        </div>
      </main>

      <footer>
        <p>TaskMaster &copy; 2026</p>
      </footer>
    </div>
  );
}

export default DashboardPage;
