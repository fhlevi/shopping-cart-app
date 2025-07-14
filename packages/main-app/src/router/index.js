import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'product',
            component: () => import(/* webpackChunkName: "product" */ 'product/App')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import( /* webpackChunkName: "cart" */ 'cart/App')
        }
    ]
})

export default router;