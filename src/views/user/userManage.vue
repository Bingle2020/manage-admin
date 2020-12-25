<template>
    <div class="user-manage WHC">
        <!-- 搜索查询栏 -->
        <top-search :keys="searchKeys" @search="search"></top-search>
        <!-- 列表数据栏 -->
        <div></div>
    </div>
</template>

<script>
import topSearch from '@/components/search/top-search';
export default {
    components: {
        topSearch
    },
    data() {
        return {
            searchKeys: {
                userName: '用户名',
                name: '姓名',
                role: '角色' 
            }
        }
    },
    computed: {
        
    },
    watch: {

    },
    methods: {
        search(obj) {
            console.log(obj);
        }
    },
    created() {
        this.$axios.get('/api/nesarc/user/getData').then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
}
</script>

<style lang="scss" scoped>
</style>