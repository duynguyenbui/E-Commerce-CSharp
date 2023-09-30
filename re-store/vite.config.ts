import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../E-Commerce/E-Commerce/wwwroot',
  },
  plugins: [react()],
});
