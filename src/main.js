// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import stores from '@/vuex/index';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.scss';
import '@/assets/css/element.scss';

export default store;

Vue.use(Vuex);
Vue.use(ElementUI);

const store = new Vuex.Store(stores);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})