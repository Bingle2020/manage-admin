export default {
    // 获取token
    getToken(state) {
        return state.token;
    },
    // 折叠状态
    collapse(state) {
        return state.isCollapse;
    }
}