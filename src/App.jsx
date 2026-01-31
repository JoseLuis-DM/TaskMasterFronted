import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import TareasPage from "./pages/TareasPage";

function App() {
  const token = localStorage.getItem("jwt");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/"  />} />
        <Route path="/perfil" element={token ? <ProfilePage /> : <Navigate to="/" />}/>
        <Route path="/tareas" element={token ? <TareasPage /> : <Navigate to="/" />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
