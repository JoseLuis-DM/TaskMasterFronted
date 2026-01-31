import { useEffect, useState } from "react";
import {
  obtenerMisTareas,
  eliminarTarea,
  cambiarEstado,
} from "../services/tareasService";
import TareaForm from "../components/TareaForm";
import TareaItem from "../components/TareaItem";

function TareasPage() {
  const [tareas, setTareas] = useState([]);
  const [tareaEditar, setTareaEditar] = useState(null);

  const cargarTareas = async () => {
    const res = await obtenerMisTareas();
    setTareas(res.data.data);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const onEliminar = async (id) => {
    await eliminarTarea(id);
    cargarTareas();
  };

  const onCambiarEstado = async (id, estado) => {
    await cambiarEstado(id, estado);
    cargarTareas();
  };

  return (
    <div className="tareas-page">
      <h2>Gestión de tareas</h2>

      <TareaForm
        tareaEditar={tareaEditar}
        onSuccess={() => {
          setTareaEditar(null);
          cargarTareas();
        }}
      />

      <div className="tareas-lista">
        {tareas.map((t) => (
          <TareaItem
            key={t.id}
            tarea={t}
            onEditar={setTareaEditar}
            onEliminar={onEliminar}
            onCambiarEstado={onCambiarEstado}
          />
        ))}
      </div>
    </div>
  );
}

export default TareasPage;
