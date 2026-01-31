import axios from "axios";

const API_URL = "http://localhost:8080/api/usuarios";

const authHeaders = () => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMyProfile = () => {
  return axios.get(`${API_URL}/me`, authHeaders());
};

export const updateUserById = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, authHeaders());
};
