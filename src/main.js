import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store.js'
import router from './routes'

Vue.config.productionTip = true

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
