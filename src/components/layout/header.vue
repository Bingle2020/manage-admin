<template>
    <div class="main-header">
        <!-- 详情页头部地址提示栏 -->
        <div class="main-header-left">
            <i class="el-icon-s-fold icon"></i>
            <div class="address-title">地址</div>
        </div>
        <!-- 详情页头部右边个人头像栏 -->
        <div class="main-header-right">
            <div class="user-avatar">
                <img :src="avatar" class="auto-img" title="头像" alt="无法显示头像">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            avatar: require('@/assets/images/avatar.jpg')
        }
    }
}
</script>

<style lang="scss" scoped>
.main-header {
    height: 50px;
    border-bottom: 1px solid #b3abab30;
    padding: 10px;
    box-sizing: border-box;
    div{
        height: 100%;
    }
}
.main-header-left {
    float: left;
    .icon {
        float: left;
        font-size: 25px;
        line-height: inherit;
        padding-right: 12px;
    }
    .address-title {
        float: left;
        line-height: 29px;
        color: #797171e0;
    }
}
.main-header-right {
    float: right;
    .user-avatar {
        float: right;
        width: 29px;
        height: 29px;
        margin-right: 12px;
        .auto-img {
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>