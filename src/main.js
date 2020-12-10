import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store.js'
import router from './routes'
import axios from 'axios'

Vue.config.productionTip = true;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4500/';
Vue.prototype.$http = axios;
Vue.prototype.$errMsg = '예상치 못한 에러 발생하였습니다.\r\n잠시 후에 다시 시도해주시기 바랍니다.';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')