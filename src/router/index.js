import { createRouter, createWebHistory } from 'vue-router'
import taskRouter from '../modules/tasks/router'
import salesRouter from '../modules/sales/router'

import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tasks',
      ...taskRouter
    },
    {
      path: '/sales',
      ...salesRouter
    }
    // {
    //   path: '/',
    //   name: 'lista',
    //   component: TaskView
    // },
    // {
    //   path: '/create',
    //   name: 'create',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/CreateView.vue')
    // }
  ]
})

export default router
