import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { //added to fix the issue of reloading on routes
    historyApiFallback: true,
  }

})
