import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' // Asegúrate de importar esto

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'tiptap-vendor': ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/pm'],
          'supabase-vendor': ['@supabase/supabase-js']
        }
      }
    }
  }
})