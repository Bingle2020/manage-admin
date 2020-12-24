<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: "App",
  created() {
    //从浏览器缓存中取出全局变量的值
    this.$store.dispatch("setToken", Cookies.get('token'));
    //关闭/刷新之前，将vuex中全局变量存入浏览器缓存中
    window.addEventListener("beforeunload", () => {
      Cookies.set('token', this.$store.getters.getToken);
    });
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
