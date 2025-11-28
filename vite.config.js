import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/webhook': {
        target: 'https://neo-core-sys.app.n8n.cloud',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
