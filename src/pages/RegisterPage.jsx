import React, { useState } from "react";
import { registerUser } from "../services/authService";
import "../styles/styles.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      setSuccess("Usuario registrado correctamente. Ya puedes iniciar sesión.");
      setError("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      setError("Error al registrar usuario");
      setSuccess("");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Registrarse</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <p>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
