# ⚡ CelularesBaratos

![Project Banner](https://via.placeholder.com/1200x400?text=Preview+del+Proyecto)

> Una experiencia de compra moderna, totalmente tipada y optimizada para el rendimiento.

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=flat&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)

## 🚀 Sobre el proyecto

Este e-commerce fue construido con un objetivo claro: **eliminar los tiempos de espera**. Utilizando una arquitectura basada en *Server State* y *caching* inteligente, la aplicación ofrece una navegación casi instantánea entre productos.

Se priorizó la **seguridad de tipos (Type Safety)** en todo el flujo de datos, desde la base de datos (Supabase) hasta los componentes de UI.

## ✨ Funcionalidades Clave

* 🎨 **Selector de Variantes Inteligente:** Lógica dinámica para validar combinaciones de stock (Color/Almacenamiento) en tiempo real.
* ⚡ **Gestión de Estado Asíncrono:** Uso de TanStack Query para manejo de caché, *refetching* en segundo plano y estados de carga optimizados.
* 📱 **Diseño Responsive:** Interfaz moderna y adaptable construida con Tailwind CSS (Mobile First).
* 🔍 **SEO Friendly:** Rutas dinámicas basadas en *slugs* amigables.

## 🛠️ Stack Tecnológico

* **Frontend:** React + Vite
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS + React Icons
* **Backend/DB:** Supabase
* **Data Fetching:** TanStack Query

## 📦 Cómo correr el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/santivillagra19/celulares-baratos-ecommerce.git

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (.env)
VITE_SUPABASE_URL=https://ykttvnpptttosiqychvz.supabase.co/
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdHR2bnBwdHR0b3NpcXljaHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDY3NDcsImV4cCI6MjA3ODcyMjc0N30.HOtvpv0645thqWPel6Ukz5wVEKI7YEojynu5BxGFjSU

# 4. Iniciar servidor
npm run dev
