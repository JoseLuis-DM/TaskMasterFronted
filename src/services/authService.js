import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Login
export const loginUser = async ({ email, password }) => {
  const res = await axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};

// Register
export const registerUser = async ({ email, password }) => {
  const res = await axios.post(
    `${API_URL}/auth/register`,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};
