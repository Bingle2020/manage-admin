export default {
    setToken(context,token) {
        context.commit('setToken',token);
    },
    delToken(context,token) {
        context.commit('delToken');
    },
    dispathM(context) {
        context.commit('modify', 'Bin2020');
    }
}