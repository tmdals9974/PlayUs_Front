import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store.js'
import router from './routes'
import axios from 'axios'

Vue.config.productionTip = true;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4500/';
Vue.prototype.$http = axios;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
