import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Todos from './components/todos'
import Contact from './components/contact'
import Login from './components/login'

const routes = [
  {
    path: '/',
    component: Todos
  },
  {
    path: '/contact',
    component: Contact
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