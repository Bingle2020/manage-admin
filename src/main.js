// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import stores from '@/vuex/index';
import Cookies from 'js-cookie';
import axios from '@/api/http';
import { Message } from 'element-ui';
import echarts from 'echarts';
import '@/assets/css/common.scss';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/element.scss';

// 白名单列表
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if (Cookies.get('token')) {
        // 已登录且要跳转的是登录页
        if (to.path === '/login') {
            Message({
                message: '您已登陆，不需要重新登陆！',
                duration: 2000
            });
            return;
        } else {
            next()
        }
    } else {
        // 在免登录白名单，直接进入
        if (whiteList.includes(to.path)) {
            next()
        } else {
            // 否则重定向到登录页
            next(`/login?redirect=${to.fullPath}`)
        }
    }
})

Vue.use(Vuex);
Vue.use(ElementUI);

const store = new Vuex.Store(stores);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
