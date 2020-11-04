import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Todos from './components/todos'
import Login from './components/login'

const routes = [
  {
    path: '/',
    component: Todos
  },
  {
    path: '/auth',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router