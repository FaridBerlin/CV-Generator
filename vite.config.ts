/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the project under /CV-Generator/, so assets need that base in production builds.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/CV-Generator/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: false,
  },
}));
