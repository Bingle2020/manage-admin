export default {
    // 删除token
    delToken(state) {
        state.token = '';
    },
    modify(state,newval) {
        state.name = newval;
    }
}