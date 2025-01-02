import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true,
    // proxy: {
    //   '/login' : 'http://192.168.1.6:8000/api/v1/auth/login'
    // }
  }
})
