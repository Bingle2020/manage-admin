import Vue from 'vue'
import Router from 'vue-router'
import { constantRoutes } from '@/router/constant'

Vue.use(Router)

export default new Router({
  routes: constantRoutes,
  mode: 'hash'
})
