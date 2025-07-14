# Main App - Micro Frontend (MFE)

This is the **Main App** micro frontend, serving as the host application in the Shopping App MFE monorepo. Built with Vue 3 and Vite, this app manages routing, global state, and integrates remote modules from the Product and Cart apps using Module Federation.

## Features

- Hosts and integrates remote micro frontends (Product App & Cart App)
- Manages global state with Vuex
- Handles application routing
- Responsive UI with TailwindCSS
- Module Federation setup with Vite

## Development

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Run the app**
   ```sh
   npm run dev
   ```

## Project Structure

- `src/` - Source code for the main app
- `vite.config.js` - Vite and Module Federation configuration

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)