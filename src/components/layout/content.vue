<template>
    <div class="main-content">
        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
.main-content {
    width: 100%;
    height: calc(100% - 50px);
    background-color: #f0f2f5;
    overflow: auto;
}
</style>