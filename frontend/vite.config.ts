import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  server: {
    port: 3000, 
    strictPort: true, 
  },
  plugins: [
    react(),
    visualizer({
      open: true, 
      gzipSize: true, 
      brotliSize: true, 
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('react')) {
            return 'react';
          }
        },
      },
    },
    cssCodeSplit: true, 
  },
});
