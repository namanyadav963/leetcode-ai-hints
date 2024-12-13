import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: 'src/background.js',
      },
      output: {
        entryFileNames: 'background.js',
      },
    },
    outDir: 'dist',
  },
});
