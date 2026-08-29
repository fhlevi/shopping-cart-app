# Shopping App - Micro Frontend (MFE) Monorepo

This project is a shopping cart application based on Micro Frontend (MFE) architecture using Vite, Vue 3, and Module Federation. It consists of three main applications: `main-app`, `product-app`, and `cart-app`, all managed in a single monorepo using Lerna and npm workspaces.

## Demo

View the live application at: [dev-shoppingcart.netlify.app](https://dev-shoppingcart.netlify.app/)

## Requirements

- [`Axios`](https://github.com/axios/axios) - For HTTP requests
- [`node-sass`](https://github.com/sass/node-sass) - For SCSS support
- [`msw`](https://mswjs.io/docs/) - Mock Service Worker for API mocking
- [`vuex`](https://vuex.vuejs.org/) - State management

## New Features

- **Integrated MFE Building**: Build and merge all micro frontends with a single command
- **Simplified Deployment**: Generates a single distributable folder for all MFEs

## Project Structure

```
.
├── .env
├── lerna.json
├── package.json
├── packages/
│   ├── cart-app/
│   ├── main-app/
│   └── product-app/
```

## Apps

- **main-app**: The main host, manages routing and global state.
- **product-app**: Displays the product list, exposed as a remote module.
- **cart-app**: Displays and manages the shopping cart.

## Features

- Micro Frontend with Module Federation (Vite)
- State management with Vuex
- Styling with TailwindCSS
- Mock Service Worker (MSW) for API testing (optional)
- Monorepo management with Lerna & npm workspaces
- Product listing with details
- Add products to cart
- View and manage cart items
- Remove products from cart
- Responsive UI with TailwindCSS

## Installation

1. **Clone the repository**
   ```sh
   git clone git@github.com:fhlevi/shopping-cart-app.git
   cd shopping-cart-app
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env` and adjust variables if needed.

4. **Run the application**
   ```sh
   # Development mode - run individual apps
   npm run main-app:dev
   npm run product-app:dev  
   npm run cart-app:dev
   ```
   This will run all three applications (`main-app`, `product-app`, `cart-app`) simultaneously on ports 3000, 3001, and 3002.
   
## Building for Production

### Build All Micro Frontends

```sh
npm run build:mfe
```

This command:
1. Builds each micro frontend
2. Updates remote entry paths for production
3. Copies the build output to a central `dist` directory
4. Configures the apps to work together in a single deployment

### Serving the Built Application

```sh
npm run serve:mfe
```

This will start a local server with all micro frontends integrated.

## Folder Structure

- `packages/main-app`: Main host, manages federation and global state.
- `packages/product-app`: Product micro frontend.
- `packages/cart-app`: Cart micro frontend.
- `scripts/build-mfe.js`: Script to build and integrate all micro frontends.
- `dist/`: (Generated) Contains the integrated build output of all micro frontends.

## Module Federation Usage

- Each app has its own `vite.config.js` for module federation configuration.
- Remote modules are exposed and imported between apps via the `remoteEntry.js` URL.

## Contribution

1. Fork this repository
2. Create a feature branch: `git checkout -b new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin new-feature`
5. Create a Pull
