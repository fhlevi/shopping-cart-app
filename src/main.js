import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'Config/mockServiceWorker';
import "bootstrap/dist/css/bootstrap.min.css"
import "@/assets/main.css"
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')