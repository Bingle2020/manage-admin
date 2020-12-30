export default {
    setToken(context,token) {
        context.commit('setToken',token);
    },
    delToken(context,token) {
        context.commit('delToken');
    },
    collapse(context) {
        context.commit('changeCollapse');
    }
}