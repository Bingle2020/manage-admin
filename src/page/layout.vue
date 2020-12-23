<template>
  <el-container>
    <el-aside width="202px">
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
import Menu from "@/components/layout/menu";
import Header from "@/components/layout/header";
// import Tabs from "@/components/layout/tabs";
import Content from "@/components/layout/content";
export default {
  components: {
    Menu,
    Header,
    // Tabs,
    Content
  }
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
.el-main {
  padding: 0;
  height: 100%;
  color: #333;
}
</style>