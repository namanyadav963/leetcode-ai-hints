import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: 'src/content.js',
        background: 'src/background.js'
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js'
      }
    }
  },
  resolve: {
    alias: {
      'webextension-polyfill': 'webextension-polyfill/dist/browser-polyfill.js'
    }
  }
});