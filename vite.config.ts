import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // @/ alias mirrors tsconfig paths — single source of truth is tsconfig.json
    alias: { '@': resolve(__dirname, 'src') },
  },
  server: {
    port: 5173,
    proxy: {
      // Event-streaming service (Go, port 8080). Strips /api prefix.
      // In Docker, set EVENT_TARGET=http://host.docker.internal:8080
      '/api/events': {
        target: process.env.EVENT_TARGET ?? 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Platform-core NestJS API (port 3000). Uses URI versioning: /v1/*
      // Rewrites /api/auth/login → /v1/auth/login, etc.
      // In Docker, set API_TARGET=http://host.docker.internal:3000
      '/api': {
        target: process.env.API_TARGET ?? 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1'),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Chunk by feature so large features don't bloat the initial bundle.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
          charts: ['recharts'],
        },
      },
    },
  },
})
