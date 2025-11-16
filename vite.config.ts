// vite.config.ts (Corrected Version with Proxy)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // You might need to install @types/node: npm i -D @types/node

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // We will use port 5173 for the frontend
    port: 5173, 
    
    // *** THIS IS THE CRITICAL PART ***
    // This proxy tells Vite to forward any request starting with '/api'
    // to your backend server running on port 5000.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // Recommended for avoiding CORS issues
        secure: false,      // Recommended for local development
      },
    },
  },
  // This part is good practice for setting up path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // Alias '@' to the root directory
    },
  },
})