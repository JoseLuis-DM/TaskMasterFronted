# TaskMaster - Frontend

---

## Tecnologías Utilizadas

### Frontend
- **React 18**
- **Vite**
- **JavaScript**
- **Axios**
- **React Router DOM**
- **CSS**

---

## Funcionalidades

- Registro y login de usuarios
- Autenticación mediante JWT
- Visualización del dashboard del usuario
- Gestión de tareas:
  - Crear tareas
  - Editar tareas
  - Eliminar tareas
  - Listar tareas
- Edición de perfil del usuario autenticado
- Protección de rutas (solo usuarios autenticados)
- Manejo de errores y validaciones básicas en formularios

---

## Estructura del Proyecto

```
TaskMaster-Frontend/
├─ src/
│  ├─ components/        <- Componentes reutilizables
│  ├─ pages/             <- Vistas principales (Login, Dashboard, Tareas, Perfil)
│  ├─ services/          <- Servicios Axios (auth, tareas, usuarios)
│  ├─ styles/            <- Estilos CSS       
│  ├─ App.jsx
│  └─ main.jsx
├─ public/
├─ package.json
├─ vite.config.js
├─ README.md
└─ .gitignore
```

---

## Configuración Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/JoseLuis-DM/TaskMaster-Frontend.git
cd TaskMaster-Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar backend

Asegúrate de que el backend esté corriendo en:

```
http://localhost:8080
```

Si es necesario, ajusta la URL base en los servicios Axios:

```js
const API_URL = "http://localhost:8080/api";
```

### 4. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación se levantará por defecto en:

```
http://localhost:5173
```

---

## Autenticación

- El JWT se obtiene al hacer login.
- El token se almacena en `localStorage`.
- Todas las peticiones protegidas incluyen el header:

```
Authorization: Bearer <token>
```