import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/page/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/home')
    }
  ]
})
