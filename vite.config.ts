import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for security
    minify: 'esbuild', // Fast minification
    chunkSizeWarningLimit: 500,
  }
});
