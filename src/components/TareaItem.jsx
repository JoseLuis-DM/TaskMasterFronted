function TareaItem({ tarea, onEditar, onEliminar, onCambiarEstado }) {
  return (
    <div className="tarea-item">
      <h4>{tarea.titulo}</h4>
      <p>{tarea.descripcion}</p>
      <p>
        Estado: <strong>{tarea.estado}</strong>
      </p>

      <div className="tarea-item-actions">
        <button className="btn-editar" onClick={() => onEditar(tarea)}>
          Editar
        </button>
        <button
          className="btn-eliminar"
          onClick={() => onEliminar(tarea.id)}
        >
          Eliminar
        </button>
      </div>

      <select
        onChange={(e) => onCambiarEstado(tarea.id, e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Cambiar estado
        </option>
        <option value="PENDIENTE">Pendiente</option>
        <option value="EN_PROGRESO">En progreso</option>
        <option value="COMPLETADA">Completada</option>
        <option value="ATRASADA">Atrasada</option>
      </select>
    </div>
  );
}

export default TareaItem;
