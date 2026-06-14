# Deploy
* https://dafpineda.github.io/web_project_around_react/
# Web Project Around React

Aplicación web desarrollada con React + Vite, enfocada en la gestión y visualización de contenido dinámico (cards, perfil de usuario, popups interactivos y autenticación de usuarios).

# Descripción del proyecto

Este proyecto consiste en una interfaz interactiva donde el usuario puede:

* Registrarse e iniciar sesión mediante autenticación con JWT
* Visualizar información de perfil
* Renderizar tarjetas dinámicamente
* Interactuar con elementos (abrir popups, editar contenido, dar like, eliminar tarjetas)
* Manejar rutas protegidas según el estado de autenticación
* Manejar eventos en React correctamente

El objetivo principal fue entender el flujo de renderizado en React, el manejo de autenticación y rutas, el uso de Context API para compartir estado global, y cómo preparar una app para producción.

## Tecnologías utilizadas
* React
* React Router DOM
* Vite
* CSS (BEM methodology)
* Git & GitHub
* GitHub Pages (deploy)

## Funcionalidades de autenticación
* **Registro de usuarios** (`/signup`): conectado a la API de TripleTen mediante el módulo `auth.js`.
* **Inicio de sesión** (`/signin`): valida credenciales y obtiene un token JWT, el cual se almacena en `localStorage`.
* **Rutas protegidas**: la ruta raíz `/` solo es accesible para usuarios autenticados mediante el componente `ProtectedRoute`. Los usuarios no autenticados son redirigidos a `/signin`.
* **InfoTooltip**: ventana modal que informa al usuario si el registro fue exitoso o falló.
* **Encabezado dinámico**: muestra "Inicia sesión" o "Regístrate" según la ruta para usuarios no autenticados, y el correo del usuario junto con la opción de "Cerrar sesión" para usuarios autenticados.

## Instalación y uso
# Clonar repositorio
git clone https://github.com/tu-usuario/web_project_around_react.git

# Entrar al proyecto
cd web_project_around_react

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.