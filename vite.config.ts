import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' // Asegúrate de importar esto

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})