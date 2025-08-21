import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mover la caché fuera de OneDrive para evitar EPERM
export default defineConfig({
  plugins: [react()],
  cacheDir: 'C:/temp/.vite-cache-reactcoder'
})
