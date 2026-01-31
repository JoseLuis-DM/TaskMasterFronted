import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("jwt", data.token);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      setError("Credenciales incorrectas");
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