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

const routes = [
  {
    path: '/',
    component: Introduction
  },
  {
    path: '/todos',
    component: Todos
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/auth',
    component: Login
  },
  {
    path: '/videos',
    component: Videos,
    children: [
      {
        path: ':key',
        component: Video
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router