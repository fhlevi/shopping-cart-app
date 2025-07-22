import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '../../'));

  return {
    server: {
      port: 3000,
    },
    ssr: {
      noExternal: ['@tailwindcss/oxide']
    },
    plugins: [
      vue(),
      tailwindcss(),
      federation({
        name: 'main',
        filename: 'remoteEntry.js',
        exposes: {
          './Store': './src/store/index.js',
        },
        remotes: {
          product: process.env.NODE_ENV === 'production' ? "./assets/product-remoteEntry.js" : "./remoteEntry.js",
          cart: process.env.NODE_ENV === 'production' ? "./assets/cart-remoteEntry.js" : "./remoteEntry.js",
        },
        shared: ['vue', 'vuex'],
      })
    ],
    define: {
      'import.meta.env.VITE_PUBLIC_API_URL': JSON.stringify(env.VITE_PUBLIC_API_URL),
      'import.meta.env.VITE_PUBLIC_MODE': JSON.stringify(env.VITE_PUBLIC_MODE),
    },
    preview: {
      port: 3000,
    },
    build: {
      cssCodeSplit: false, // Gabungkan CSS ke JS
      modulePreload: false,
      target: 'esnext',
      minify: false,
      rollupOptions: {
        // Fix for crypto.hash issue
        external: ['crypto'],
      },
    },
  }
})
