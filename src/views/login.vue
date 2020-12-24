<template>
    <div>
        <h1>登录页</h1>
        <button @click="login">点击登录</button>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            this.$store.dispatch('setToken', 'ucbaiudgiauhduwhdo');
        }
    }
}
</script>>