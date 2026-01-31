import axios from "axios";

const API_URL = "http://localhost:8080/api/tareas";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export const obtenerMisTareas = () =>
  axios.get(`${API_URL}/me`, authHeader());

export const agregarTarea = (tarea) =>
  axios.post(API_URL, tarea, authHeader());

export const editarTarea = (id, tarea) =>
  axios.put(`${API_URL}/${id}`, tarea, authHeader());

export const eliminarTarea = (id) =>
  axios.delete(`${API_URL}/${id}`, authHeader());

export const cambiarEstado = (id, nuevoEstado) =>
  axios.patch(
    `${API_URL}/${id}/estado`,
    null,
    {
      ...authHeader(),
      params: { nuevoEstado },
    }
  );
