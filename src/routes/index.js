import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/main.vue'
import Login from '../components/login.vue'
import CreateProject from '../components/createProject.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/createProject',
    name: 'createProject',
    component: CreateProject
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router