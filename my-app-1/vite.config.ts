import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' : {target: 'https://localhost:7071', // The API is running locally via IIS on this port
      changeOrigin: true,
      secure: false}}
  },
  plugins: [react()],
})
