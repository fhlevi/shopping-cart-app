import { createApp } from 'vue';
import App from './App.vue';
import store from 'main/Store'
import './styles/global.css';

const app = createApp(App)
app.use(store);
app.mount('#app')
