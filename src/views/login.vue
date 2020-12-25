<template>
  <div class="login-wrap WHC">
    <div class="box">
      <div>
        账号：
        <el-input placeholder="请输入账号" v-model="account"> </el-input>
      </div>
      <div>
        密码：
        <el-input type="password" placeholder="请输入密码" v-model="password">
        </el-input>
      </div>
      <div>
        <el-button @click="login" type="primary">登录</el-button>
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
              console.log('保存成功');
              // 跳转到主页
              let toPath = this.$route.query.redirect ? this.$route.query.redirect : '/';
              this.$router.push({path: toPath});
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
  created() {
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 500px;
  height: 400px;
  margin: 50px auto;
  border: 1px solid black;
}
</style>