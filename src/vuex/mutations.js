export default {
    // 设置token
    setToken(state,token) {
        state.token = token;
    },
    // 删除token
    delToken(state) {
        state.token = '';
    },
    modify(state,newval) {
        state.name = newval;
    }
}