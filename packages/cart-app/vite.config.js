import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3002,
  },
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.vue",
      },
      remotes: {
        main: "http://localhost:3000/assets/remoteEntry.js",
      },
      shared: ['vue', 'vuex'],
    }),
  ],
  preview: {
    port: 3002,
  },
  build: {
    cssCodeSplit: false, // Gabungkan CSS ke JS
    modulePreload: false,
    target: 'esnext',
    minify: false,
  },
})
