import React, { useState } from "react";
import { loginUser } from "../services/authService";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({ email, password });

      const token = response?.data?.accessToken;
      if (!token) {
        throw new Error("No se recibió token JWT del backend");
      }

      localStorage.setItem("jwt", token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Error de login:", err);
      setError("Credenciales incorrectas o token no recibido");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;