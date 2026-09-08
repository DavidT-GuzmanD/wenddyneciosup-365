import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 4321, open: false },
  preview: { port: 4321 },
  build: { outDir: 'dist', assetsDir: 'build', sourcemap: false },
})
