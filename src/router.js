import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Introduction from './components/introduction'
import Todos from './components/todos/list'
import Contact from './components/contact'
import Login from './components/login'
import NotFound from './components/not-found'
import Videos from './components/videos'
import Video from './components/video'
import Checkout from './components/checkout'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Introduction
  },
  {
    name: 'todos',
    path: '/todos',
    component: Todos
  },
  {
    name: 'contact',
    path: '/contact',
    component: Contact
  },
  {
    name: 'auth',
    path: '/auth',
    component: Login
  },
  {
    name: 'videos',
    path: '/videos',
    component: Videos,
    children: [
      {
        name: 'video',
        path: ':key',
        component: Video
      }
    ]
  },
  {
    name: 'checkout',
    path: '/checkout/:orderId',
    component: Checkout
  },
  {
    name: 'default',
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router