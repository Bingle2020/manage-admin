<template>
  <div class="login-wrap WHC">
    <div class="box">
      <div class="box-item">
        <h2 style="color: #fff">盛视科技</h2>
      </div>
      <div class="box-item">
        <el-input placeholder="请输入账号" v-model="account">
          <template slot="prepend"><i class="el-icon-user"></i></template>
        </el-input>
      </div>
      <div class="box-item">
        <el-input type="password" placeholder="请输入密码" v-model="password">
          <template slot="prepend"><i class="el-icon-key"></i></template>
        </el-input>
      </div>
      <div class="box-item martop">
        <el-button @click="login" type="primary">登录</el-button>
      </div>
      <div class="box-item flbottom">
        <el-button type="text">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.account && this.password) {
        this.$axios
          .post("/api/nesarc/login", {
            account: this.account,
            password: Number(this.password),
          })
          .then((res) => {
            // 账号密码成功
            if (res.success) {
              // 返回的验证信息
              let datas = res.response.data;
              // 存放到本地
              Object.keys(datas).forEach((item) => {
                Cookies.set(item, datas[item]);
              });
              console.log("保存成功");
              // 跳转到主页
              let toPath = this.$route.query.redirect
                ? this.$route.query.redirect
                : "/";
              this.$router.push({ path: toPath });
            }
            // 账号密码失败
            else {
              this.$message({
                message: res.error,
                duration: 2000,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$message({
              message: err,
              duration: 2000,
              type: "error",
            });
          });
      } else {
        this.$message({
          message: "请输入账号 或者 密码！",
          duration: 2000,
          type: "error",
        });
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.login-wrap {
  background-image: url("../assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .box {
    position: relative;
    width: 450px;
    height: 330px;
    margin: 80px auto;
    padding: 25px 40px;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 1px 1px 6px 0px #8b8f90b5;
    box-sizing: border-box;
    .box-item {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.martop {
        margin-top: 30px;
      }
      &.flbottom {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 20px;
      }
      .el-icon-user {
        font-size: 18px;
      }
      .el-icon-key {
        font-size: 18px;
      }
      .el-button--primary {
        width: 300px;
      }
      .el-input {
        width: 300px;
      }
    }
  }
}
</style>