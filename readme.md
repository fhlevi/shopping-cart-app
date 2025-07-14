# Shopping App - Micro Frontend (MFE) Monorepo

This project is a shopping cart application based on Micro Frontend (MFE) architecture using Vite, Vue 3, and Module Federation. It consists of three main applications: `main-app`, `product-app`, and `cart-app`, all managed in a single monorepo using Lerna and npm workspaces

## Requirements

- [`Axios`](https://github.com/axios/axios) - For HTTP requests
- [`node-sass`](https://github.com/sass/node-sass) - For SCSS support
- [`msw`](https://mswjs.io/docs/) - Mock Service Worker for API mocking
- [`vuex`](https://vuex.vuejs.org/) - State management

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
   npm run dev
   ```
   This will run all three applications (`main-app`, `product-app`, `cart-app`) simultaneously on ports 3000, 3001, and 3002.

## Folder Structure

- `packages/main-app`: Main host, manages federation and global state.
- `packages/product-app`: Product micro frontend.
- `packages/cart-app`: Cart micro frontend.

## Module Federation Usage

- Each app has its own `vite.config.js` for module federation configuration.
- Remote modules are exposed and imported between apps via the `remoteEntry.js` URL.

## Contribution

1. Fork this repository
2. Create a feature branch: `git checkout -b new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin new-feature`
5. Create a Pull