import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import "@fortawesome/fontawesome-free/css/all.css";
import './styles/global.css'
import './config/mockService';


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
