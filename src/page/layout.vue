<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
    </el-container>
</template>

<script>
export default {};
</script>

<style>
#main {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>