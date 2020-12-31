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
        :collapse="collapse"
      >
        <template v-for="main in menuLists">
          <!-- 一级菜单1 -->
          <el-menu-item
            v-if="main.childs.length <= 0"
            :index="main.path"
            :key="main.path"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ main.title }}</span>
          </el-menu-item>
          <!-- 一级菜单2 -->
          <el-submenu
            v-else
            :index="main.path ? main.path : main.title + new Date().getTime()"
            :key="main.path"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ main.title }}</span>
            </template>
            <div class="menu-area">
              <!-- 二级菜单 -->
              <template v-for="child in main.childs">
                <el-menu-item
                  v-if="child.childs.length <= 0"
                  :index="child.path"
                  :key="child.path"
                  class="single-item"
                  >{{ child.title }}</el-menu-item
                >
                <el-submenu
                  v-else
                  :index="
                    child.path ? child.path : child.title + new Date().getTime()
                  "
                  :key="child.path"
                >
                  <template slot="title">{{ child.title }}</template>
                  <!-- 三级菜单 -->
                  <el-menu-item
                    v-for="item in child.childs"
                    :key="item.path"
                    :index="item.path"
                    class="list-item-child"
                    >{{ item.title }}</el-menu-item
                  >
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
import { mapGetters } from "vuex";
export default {
  name: "menus",
  data() {
    return {
      menuLists: [
        {
          childs: [],
          id: "1",
          path: "/home",
          title: "首页",
        },
        {
          childs: [
            {
              childs: [],
              id: "4",
              path: "/found",
              title: "可视对讲",
            },
          ],
          id: "2",
          title: "流调管理",
        },
        {
          childs: [
            {
              childs: [],
              id: "7",
              path: "/person",
              title: "流调报警统计",
            },
          ],
          id: "5",
          title: "查询统计",
        },
        {
          childs: [
            {
              childs: [],
              id: "10",
              path: "/userManage",
              title: "用户管理",
            },
            {
              childs: [],
              id: "11",
              path: "/roleManage",
              title: "角色管理",
            },
          ],
          id: "8",
          title: "系统设置",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['collapse']),
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      // to , from 分别表示从哪跳转到哪，都是一个对象
      // to.path  ( 表示的是要跳转到的路由的地址 eg: /home )
    },
  },
  methods: {
    // 加载菜单列表
    loadMenus() {
      this.$axios
        .get("api/nesarc/loadMenus")
        .then((res) => {
          let datas = res.response.data;
          this.menuLists = datas.length > 0 ? [...datas] : this.menuLists;
          // this.menuLists = [...datas];
          console.log("菜单加载成功");
        })
        .catch((err) => {
          console.log("菜单加载失败");
        });
    },
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
      
    },
  },
  created() {
    this.loadMenus();
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