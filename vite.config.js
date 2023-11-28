import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import htmlPurge from 'vite-plugin-purgecss';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'oereb_client/static/build'),
    lib: {
      entry: path.resolve(__dirname, 'oereb_client/static/src/oereb_client.jsx'),
      name: "app",
      fileName: "app"
    },
    rollupOptions: {
      output: {
        assetFileNames: "app.[ext]"
      },
    }
  },
  plugins: [
    react(),
    htmlPurge()
  ],
  define: {
    // 'process.env.NODE_ENV': '"production"'
    'process.env': {}
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/js/setupTests.js'
  }
});
