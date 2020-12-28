<template>
  <div class="user-manage WHC">
    <!-- 搜索查询栏 -->
    <top-search
      :add="true"
      addText="添加用户"
      @addfn="addUser"
      :keys="searchKeys"
      @search="search"
    ></top-search>
    <!-- 列表数据栏 -->
    <my-table
      title="数据列表"
      :sources="dataSource"
      :columns="column"
      :actions="action"
      @clickFn="operateFn"
      :splitPage="true"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      :pageSizes="[100, 200, 300, 400]"
      :pageSize="100"
    >
    </my-table>
    <!-- 输入弹窗 -->
    <el-dialog
      :title="editType === 0 ? '添加用户' : '修改用户'"
      :visible.sync="editBox"
      :append-to-body="true"
    >
      <el-form :model="userInfo">
        <el-form-item label="用户名" :label-width="inputWid" required>
          <el-input
            size="medium"
            v-model="userInfo.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="inputWid" required>
          <el-select v-model="userInfo.userRoleId" placeholder="请选择角色">
            <el-option v-for="item in roles" :label="item.roleName" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" :label-width="inputWid" required>
          <el-select v-model="userInfo.sex" placeholder="选择您的性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" :label-width="inputWid" required>
          <el-input
            size="medium"
            v-model="userInfo.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="inputWid" required>
          <el-input
            v-model="userInfo.userPwd"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editBox = false">取 消</el-button>
        <el-button type="primary" @click="sureAddUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import topSearch from "@/components/search/topSearch";
import myTable from "@/components/table/myTable";
export default {
  components: {
    topSearch,
    myTable,
  },
  data() {
    return {
      editBox: false,
      editType: 0,
      userInfo: {
        account: "",
        userRoleId: "",
        sex: "",
        userName: "",
        userPwd: "",
      },
      roles: [],
      inputWid: "100px",
      searchKeys: {
        userName: "用户名",
        name: "姓名",
        sex: "性别",
        role: "角色",
      },
      dataSource: [],
      column: [
        {
          title: "ID",
          key: "@id",
          width: undefined,
        },
        {
          title: "用户名",
          key: "account",
          width: undefined,
        },
        {
          title: "姓名",
          key: "userName",
          width: undefined,
        },
        {
          title: "性别",
          key: "sex",
          width: undefined,
        },
        {
          title: "角色",
          key: "roleNameOfU",
          width: undefined,
        },
      ],
      action: {
        title: "操作",
        actions: [
          {
            edit: "修改",
            icon: "el-icon-edit",
            type: "info",
            fn: "modifyData",
          },
          {
            edit: "删除",
            icon: "el-icon-delete",
            type: "danger",
            fn: "delData",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取角色列表
    getRoles() {
      this.$axios
        .get("/api/nesarc/role/getRoleList")
        .then((res) => {
          if (res.success) {
            let datas = res.response.data;
            this.roles = [...datas];
            console.log("获取角色成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadData() {
      this.$axios
        .get("/api/nesarc/user/getData")
        .then((res) => {
          let datas = res.response.data.rows;
          this.dataSource = [...datas];
          console.log(datas);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    operateFn(obj) {
      this[obj.fn](obj.data.id);
    },
    // 搜索条件
    search(obj) {
      console.log(obj);
    },
    // 添加用户
    addUser() {
      this.editBox = true;
      this.editType = 0;
      console.log("添加用户");
    },
    // 确定添加用户
    sureAddUser() {
      for (let key in this.userInfo) {
        if (this.userInfo[key] === "") {
          return this.$message({
            message: "请补全信息!",
            type: "error",
          });
        }
      }
      this.$axios
        .post("/api/nesarc/user/add", this.userInfo)
        .then((res) => {
          if (res.success) {
            this.loadData();
            this.editBox = false;
            this.clearInfo();
            this.$message({
              message: "信息添加成功!",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 清楚输入框历史信息
    clearInfo() {
      Object.keys(this.userInfo).forEach((item) => {
        this.userInfo[item] = "";
      });
    },
    // 删除用户
    delData(id) {
      this.$confirm("即将删除该用户, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/api/nesarc/user/delete", {
              id,
            })
            .then((res) => {
              if (res.success) {
                this.loadData();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            })
            .catch((err) => {
              this.$message({
                type: "info",
                message: "删除失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    sizeChange(val) {
      console.log(val);
    },
    currentChange(val) {
      console.log(val);
    },
  },
  created() {
    this.getRoles();
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  width: 40%;
  .el-select {
    width: 140px;
  }
}
</style>