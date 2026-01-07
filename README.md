# 🚀 [Nombre de tu E-commerce]

![Project Banner](https://via.placeholder.com/1200x400?text=Banner+del+Proyecto+aqui)
> Una experiencia de compra moderna, rápida y totalmente tipada.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)

## 📖 Sobre el proyecto

Este proyecto no es solo una tienda online; es una exploración profunda sobre cómo manejar **estado asíncrono complejo** y relaciones de bases de datos en el frontend.

El objetivo fue construir un e-commerce escalable donde la experiencia de usuario (UX) fuera instantánea. Para lograrlo, se implementó una arquitectura basada en **Server State** con TanStack Query, eliminando la necesidad de `useEffect` innecesarios y garantizando caché automática.

### 🔗 Demo
[Ver sitio en vivo](https://tu-url-aqui.com) | [Ver diseño en Figma](https://tu-url-figma.com)

---

## ✨ Características Clave

* 📦 **Gestión de Productos Dinámica:** Carga de productos mediante *slugs* para URLs amigables (SEO friendly).
* 🎨 **Selector de Variantes Inteligente:** Lógica compleja para filtrar combinaciones de *Color* y *Almacenamiento* en tiempo real (solo muestra combinaciones existentes en stock).
* ⚡ **Optimistic UI & Caching:** Gracias a React Query, la navegación entre productos es casi instantánea tras la primera carga.
* 📱 **Diseño Responsive:** Interfaz adaptada a móvil y escritorio usando Tailwind CSS "Mobile First".
* 🛡️ **Type Safety:** Todo el proyecto está tipado estrictamente con TypeScript para evitar errores en tiempo de ejecución.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | ¿Por qué? |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Velocidad de desarrollo y ecosistema robusto. |
| **Lenguaje** | TypeScript | Para asegurar la integridad de los datos entre Supabase y el cliente. |
| **Estilos** | Tailwind CSS | Para un desarrollo de UI rápido, consistente y mantenible. |
| **Estado/Data** | TanStack Query | Manejo de caché, reintentos y estados de carga/error automáticos. |
| **Backend/DB** | Supabase | Base de datos PostgreSQL con APIs generadas automáticamente. |
| **Iconos** | React Icons | Librería ligera y modular de iconos (LuIcons, CiIcons, etc). |

---

## 💡 Highlight de Código: Lógica de Variantes

Uno de los mayores desafíos fue transformar la respuesta plana de la base de datos (SQL Joins) en una estructura jerárquica utilizable por el UI para seleccionar colores y capacidades.

Implementé un `useMemo` con una reducción de datos para agrupar variantes sin afectar el rendimiento de renderizado:

```typescript
// Transformación de datos en tiempo real: O(n)
const colors = useMemo(() => {
    return (product?.variants ?? []).reduce((acc: Acc, variant: VariantProduct) => {
        const { color, color_name, storage } = variant;

        // Inicialización dinámica del agrupador
        if (!acc[color]) {
            acc[color] = { name: color_name, storages: [] };
        }

        // Evitar duplicados en almacenamiento
        if (!acc[color].storages.includes(storage)) {
            acc[color].storages.push(storage);
        }

        return acc;
    }, {} as Acc);
}, [product?.variants]);
