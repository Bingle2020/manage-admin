<template>
  <div class="box">
    <span class="title">
        <i class="el-icon-search b"></i>
        查询
    </span>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  .title {
    text-align: center;
    width: 70px;
    height: 22px;
    line-height: 22px;
    display: block;
    font-family: fangsong;
  }
  .el-divider--horizontal {
    margin: 5px 0;
  }
}
</style>