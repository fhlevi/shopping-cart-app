import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '../../'));

  return {
    server: {
      port: 3001,
    },
    plugins: [
      vue(),
      tailwindcss(),
      federation({
        name: "product",
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
    define: {
      'import.meta.env.VITE_PUBLIC_API_URL': JSON.stringify(env.VITE_PUBLIC_API_URL),
      'import.meta.env.VITE_PUBLIC_MODE': JSON.stringify(env.VITE_PUBLIC_MODE),
    },
    preview: {
      port: 3001,
    },
    build: {
      cssCodeSplit: false, // Gabungkan CSS ke JS
      modulePreload: false,
      target: 'esnext',
      minify: false,
    },
  }
})
