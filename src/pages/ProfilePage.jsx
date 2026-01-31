import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, updateUserById } from "../services/usuarioService";
import "../styles/styles.css";

function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    rol: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await getMyProfile();
        const usuario = res.data.data;

        setUser({
          id: usuario.id ?? "",
          nombre: usuario.nombre ?? "",
          apellidos: usuario.apellidos ?? "",
          email: usuario.email ?? "",
          password: "",
          rol: usuario.rol ?? "",
        });
      } catch (err) {
        console.error("Error cargando perfil", err);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateUserById(user.id, {
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        password: user.password || null,
        rol: user.rol,
      });

      alert("Perfil actualizado correctamente");
      setEditing(false);
    } catch (err) {
      console.error("Error actualizando perfil", err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>

        <div className="profile-field">
          <label>Nombre</label>
          <input
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="profile-field">
          <label>Apellidos</label>
          <input
            name="apellidos"
            value={user.apellidos}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="profile-field">
          <label>Nueva contraseña</label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            disabled={!editing}
            placeholder="••••••••"
          />
        </div>

        <div className="profile-field">
          <label>Rol</label>
          <input value={user.rol} disabled />
        </div>

        <div className="profile-actions">
          {!editing ? (
            <button className="btn-primary" onClick={() => setEditing(true)}>
              Editar perfil
            </button>
          ) : (
            <>
              <button className="btn-primary" onClick={handleSave}>
                Guardar
              </button>
              <button
                className="btn-secondary"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
            </>
          )}
        </div>

        <div className="profile-back">
          <button onClick={() => navigate("/dashboard")}>
            Volver al dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
