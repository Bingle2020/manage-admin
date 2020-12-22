<template>
    <div>
        <h1>{{ look }}</h1>
        <button class="btn" @click="dispathM">按钮</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    methods: mapActions(['dispathM']),
    computed: mapGetters(['look'])
}
</script>

<style lang="scss" scoped>
.btn {
    color: red;
}
</style>