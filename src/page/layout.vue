<template>
  <el-container>
    <el-aside
      :class="collapse ? 'slow' : 'fast'"
      :width="collapse ? '65px' : '202px'"
    >
      <Menu></Menu>
    </el-aside>
    <el-main>
      <Header></Header>
      <!-- <Tabs></Tabs> -->
      <Content></Content>
    </el-main>
  </el-container>
</template>

<script>
import Menu from "@/page/layout/menu";
import Header from "@/page/layout/header";
// import Tabs from "@/page/layout/tabs";
import Content from "@/page/layout/content";
import { mapGetters } from "vuex";
export default {
  components: {
    Menu,
    Header,
    // Tabs,
    Content,
  },
  data() {
    return {
      width: 202,
    };
  },
  computed: {
    ...mapGetters(["collapse"]),
  },
};
</script>

<style>
.el-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  height: 100%;
  color: rgb(24, 22, 22);
  box-sizing: border-box;
}
.fast {
  transition: width 0.2s cubic-bezier(0.94, -0.37, 0.97, 0.98) .2s;
}
.slow {
  transition: width 0s linear;
}
.el-main {
  padding: 0;
  height: 100%;
  color: #333;
}
</style>