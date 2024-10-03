/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    compression({
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  base: '/iztaluna-shop/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    reporters: ['default', 'json'],
    outputFile: './test-report.json',
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      'ui/components': path.resolve(__dirname, './src/ui/components'),
      'ui/containers': path.resolve(__dirname, './src/ui/containers'),
      utils: path.resolve(__dirname, './src/utils'),
      styles: path.resolve(__dirname, './src/styles'),
      config: path.resolve(__dirname, './src/config'),
      services: path.resolve(__dirname, './src/services'),
      store: path.resolve(__dirname, './src/store'),
      constants: path.resolve(__dirname, './src/constants'),
    },
  },
})
