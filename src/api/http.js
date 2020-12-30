import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';
import store from '@/vuex/index';
import router from '../router';
import {
  Message
} from 'element-ui';

/*
 * 区分环境
 */
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://api.kaifa.cn';
    break;
  case 'test':
    axios.defaults.baseURL = 'http://192.168.20.12:8080';
    break;
  default:
    axios.defaults.baseURL = 'http://localhost:8080'; // 开发环境下
}

/*
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

/*
 * 设置请求传递数据的格式(具体看服务器要求什么格式)
 * x-www-form-urlencoded
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'; // 针对get请求格式
axios.defaults.transformRequest = data => qs.stringify(data); // 针对post请求格式
// axios.defaults.headers['Content-Type'] = 'application/json' // 请求的数据格式为 json

/*
 * 设置请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token检验(jwt): 接受服务器返回的token, 存储到vuex/本地cookie中
 * 每一次向服务器发请求,都应该把token带上
 */
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
    let token = Cookies.get('accessToken');
    // let token = store.state.token;
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  error => {
    return Promise.reject(error);
    // return Promise.error(error);
  })

/*
 * 自定义响应成功的http状态码(通常不用)
 */
// axios.defaults.validateStatus = status => {
//     return /^(2|3)\d{2}$/.test(status);
// };

/*
 * 响应拦截器
 * 服务器返回信息 -> [拦截的统一处理] -> 客户端js获取到的信息
 */
axios.interceptors.response.use(
  response => {
    const res = response.data.response;
    // response节点不为空，并且为对象，并且code 为2的时候，说明accesstoken失效了,调用接口重新获取token,覆盖本地存的两个token变量
    if (res && res.code === 2) {
      axios.post('/api/nesarc/accessToken/refresh/', {
        refreshToken: Cookies.get('refreshToken')
      }).then(res => {
        let data = res.response.data;
        if (res.success && res.response.code === 0) {
          // 重新存放到本地
          Object.keys(data).forEach((item) => {
            Cookies.set(item, data[item]);
          });
          Message({
            message: '重新获取身份成功！',
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: '重新获取身份失败!',
            duration: 2000
          });
        }
      }).catch(err => {
        Message({
          showClose: true,
          message: err,
          duration: 2000
        });
      })
    }
    // response节点不为空，并且为对象，并且code 为3的时候，两个token都失效了，转到登录界面去
    else if (res && res.code === 3) {
      let info = ['accessToken','refreshToken','account','userName'];
      info.forEach(item=>{
        Cookies.remove(item);
      })
      Message({
        showClose: true,
        message: '登录过期，请重新登录!',
        duration: 2000
      });
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    // 
    // 200/300统一正确返回
    else {
      return Promise.resolve(response.data);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    let {
      response
    } = error;
    let {
      status
    } = response;
    if (response) {
      // 服务器仍有返回结果
      switch (status) {
        case 401: // 当前请求需要用户验证(一般是未登录)
          // 未登录则跳转登录页面，并携带当前页面的路径
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          break;
        case 403: // 服务器已经理解请求,但是拒绝执行它(一般是token过期)
          // 登录过期对用户进行提示
          Message({
            showClose: true,
            message: '登录过期，请重新登录',
          });
          // 清除本地token/清空vuex中token
          Cookies.remove('accessToken');
          store.dispatch('delToken');
          // 跳转登录页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          // 跳转到登录页
          break;
        case 404: // 请求失败,请求资源未在服务器上发现(找不到页面)
          Message({
            showClose: true,
            message: '网络请求不存在',
            type: 'warning'
          });
          break;
        default: // 其他错误，直接抛出错误提示
          Message({
            showClose: true,
            message: error.response.data.message,
            type: 'error'
          });
      }
      return Promise.reject(error.response);
    } else {
      // 服务器无返回结果
      if (!window.navigator.onLine) {
        // 断网处理: 可以跳转到断网页面
        router.replace({
          path: '/refresh',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        return;
      }
      return Promise.reject(error);
    }
  }
)

export default axios;
