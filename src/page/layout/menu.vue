<template>
  <el-row class="tac" style="height: 100%">
    <el-col :span="12" class="menu-box">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <template v-for="main in menuLists">
          <!-- 一级菜单1 -->
          <el-menu-item v-if="main.childs.length <= 0" :index="main.path" :key="main.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ main.title }}</span>
          </el-menu-item>
          <!-- 一级菜单2 -->
          <el-submenu v-else :index="main.path" :key="main.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ main.title }}</span>
            </template>
            <div class="menu-area">
              <!-- 二级菜单 -->
              <template v-for="child in main.childs">
                <el-menu-item v-if="child.childs.length <= 0" :index="child.path" :key="child.path" class="single-item">{{ child.title }}</el-menu-item>
                <el-submenu v-else :index="child.path" :key="child.path">
                  <template slot="title">{{ child.title }}</template>
                  <!-- 三级菜单 -->
                  <el-menu-item v-for="item in child.childs" :key="item.path" :index="item.path" class="list-item-child">{{ item.title }}</el-menu-item>
                </el-submenu>
              </template>
            </div>         
          </el-submenu>
        </template>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'menus',
  data() {
    return {
      menuLists: [
        {
          title: '首页',
          path: '/asdd',
          childs: [
            {
              title: '发现页',
              path: '/found',
              childs: []
            },
            {
              title: '个人页',
              path: '/person',
              childs: []
            },
            {
              title: '主页',
              path: '/home',
              childs: []
            },
          ]
        },
        {
          title: '用户管理',
          path: '/userManage',
          childs:[]
        },
        {
          title: '统计图表',
          path: '/chart',
          childs:[]
        },
        {
          title: '报错',
          path: 'eoiahf',
          childs: [
            {
              title: '服务报错',
              path: '/errors',
              childs: [
                {
                  title: '401',
                  path: '/errors/401',
                },
                {
                  title: '403',
                  path: '/errors/403',
                },
                {
                  title: '404',
                  path: '/errors/404',
                },
                {
                  title: 'error',
                  path: '/errors/error',
                },
                {
                  title: 'netsplit',
                  path: '/errors/netsplit',
                }
              ]
            }
          ]
        }
      ]
    }
  },
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
/deep/ .el-submenu__title {
  text-align: left;
}
/deep/ .el-menu-item {
  text-align: left;
}
</style>