import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/page/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/found',
          name: 'found',
          component: () => import('../views/found')
        },
        {
          path: '/person',
          name: 'person',
          component: () => import('../views/person')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home')
        },
        {
          path: '/errors',
          name: 'errors',
          component: () => import('../page/errors/index'),
          children: [
            {
              path: '/errors/401',
              name: '401',
              component: () => import('../page/errors/401')
            },
            {
              path: '/errors/403',
              name: '403',
              component: () => import('../page/errors/403')
            },
            {
              path: '/errors/404',
              name: '404',
              component: () => import('../page/errors/404')
            },
            {
              path: '/errors/error',
              name: 'error',
              component: () => import('../page/errors/error')
            },
            {
              path: '/errors/netsplit',
              name: 'netsplit',
              component: () => import('../page/errors/netsplit')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login')
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: () => import('@/page/errors/refresh')
    },
  ],
  mode: 'history'
})
