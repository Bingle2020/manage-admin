import router from './index'
// import Cookies from 'js-cookie'
import store from '@/vuex/index';


// 白名单列表
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if (store.state.token !== '') {
        // 已登录且要跳转的是登录页
        if (to.path === '/login') {
            next({ path: '/' })
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
