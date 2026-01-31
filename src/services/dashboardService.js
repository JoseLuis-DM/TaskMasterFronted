import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getMetricas = async (token) => {

  if (!token) {
    throw new Error("No hay token JWT guardado en localStorage");
  }

  try {
    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
  } catch (err) {
    if (err.response) {
      if (err.response.status === 403) {
        console.error("Acceso denegado: token inválido o expirado");
      } else {
        console.error("Error en la petición:", err.response.status, err.response.data);
      }
    } else {
      console.error("Error al conectar con el backend:", err.message);
    }
    throw err;
  }
};