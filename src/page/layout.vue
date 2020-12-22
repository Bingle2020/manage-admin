<template>
  <el-container>
    <el-aside width="200px">
      <Menu></Menu>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
import Menu from "@/components/menu"
export default {
  components: {
    Menu
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
  /* background-color: #97b1d6; */
  height: 100%;
  color: #333;
}
</style>