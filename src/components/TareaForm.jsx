import { useEffect, useState } from "react";
import { agregarTarea, editarTarea } from "../services/tareasService";

const initialState = {
  titulo: "",
  descripcion: "",
  categoriaId: "",
  estadoId: "",
  limite: "",
};

function TareaForm({ tareaEditar, onSuccess }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (tareaEditar) {
      setForm({
        titulo: tareaEditar.titulo ?? "",
        descripcion: tareaEditar.descripcion ?? "",
        categoriaId: tareaEditar.categoriaId ?? "",
        estadoId: tareaEditar.estadoId ?? "",
        limite: tareaEditar.limite ?? "",
      });
    }
  }, [tareaEditar]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tareaEditar) {
      await editarTarea(tareaEditar.id, form);
    } else {
      await agregarTarea(form);
    }

    setForm(initialState);
    onSuccess();
  };

  return (
    <form className="tarea-form" onSubmit={handleSubmit}>
      <h3>{tareaEditar ? "Editar tarea" : "Nueva tarea"}</h3>

      <input
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
      />

      <input
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />

      <input
        name="categoriaId"
        value={form.categoriaId}
        onChange={handleChange}
        placeholder="Categoría ID"
      />

      <input
        name="estadoId"
        value={form.estadoId}
        onChange={handleChange}
        placeholder="Estado ID"
      />

      <input
        type="date"
        name="limite"
        value={form.limite}
        onChange={handleChange}
      />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default TareaForm;
