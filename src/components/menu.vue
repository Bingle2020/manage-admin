<template>
  <el-row class="tac" style="height: 100%">
    <el-col :span="12" class="menu-box">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>菜单一</span>
          </template>
          <el-menu-item-group>
          </el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-submenu index="1-2" class="list-item">
                <template slot="title">选项2</template>
                <el-menu-item index="1-2-1" class="list-item-child">选项1</el-menu-item>
                <el-menu-item index="1-2-2" class="list-item-child">选项2</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">菜单二</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-box {
    height: 100%;
    width: 100%;
}
.el-menu {
    height: 100%;
}
.list-item {
    padding: 0 40px 0 15px;
}
.list-item-child {
    padding: 0!important;
    min-width: 180px;
}
</style>