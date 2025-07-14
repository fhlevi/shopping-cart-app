import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.css'
import store from 'main/Store'

const app = createApp(App)
app.use(store)
app.mount('#app')
