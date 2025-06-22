<h1 align='left'>🛒 Shoppingcart</h1>

## 📑 Table of Contents

- [📖 Introduction](#introduction)
- [✨ Features](#features)
- [⚙️ Requirements](#requirements)
- [📁 Project Structure](#project-structure)
- [🚀 Usage](#usage-for-development)
- [🔗 Release Link](#release-link)

## 📖 Introduction

**Shoppingcart** is a simple shopping cart application built with Vue.js. It simulates a basic e-commerce workflow, allowing users to browse products, add them to a cart, and manage their cart items. This project is suitable for learning state management, API handling, and component-based architecture in Vue.

## 🔗 Demo

Lihat aplikasi yang berjalan di: [simplecarts.netlify.app](https://simplecarts.netlify.app)

## ✨ Features

- Product listing with details
- Add products to cart
- View and manage cart items
- Remove products from cart
- Responsive UI with Bootstrap

## ⚙️ Requirements

- [`Axios`](https://github.com/axios/axios) - For HTTP requests
- [`node-sass`](https://github.com/sass/node-sass) - For SCSS support
- [`msw`](https://mswjs.io/docs/) - Mock Service Worker for API mocking
- [`vuex`](https://vuex.vuejs.org/) - State management
- [`bootstrap`](https://getbootstrap.com/docs/5.2/getting-started/download/) - UI framework

## 📁 Project Structure

```
shopping-cart-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/           # Images, styles, etc.
│   ├── components/       # Vue components (ProductList.vue, Cart.vue, etc.)
│   ├── store/            # Vuex store modules
│   ├── views/            # Page-level components
│   ├── App.vue           # Root Vue component
│   ├── main.js           # App entry point
│   └── api/              # API handlers (mock or real)
├── package.json
├── README.md
└── ...other config files
```

## 🚀 Usage for Development

1. Open your terminal or command prompt.
2. Clone the repository:
    - HTTPS: `git clone https://github.com/fhlevi/shopping-cart-app.git`
    - SSH: `git@github.com:fhlevi/shopping-cart-app.git`
3. Navigate to the project folder: `cd shoppingcart`
4. Install dependencies: `npm install`
5. Start the development server: `npm run serve`
6. Open [http://localhost:2000](http://localhost:2000) in your browser to view the app.
