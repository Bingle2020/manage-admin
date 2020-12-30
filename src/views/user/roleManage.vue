<template>
  <div class="role-manage WHC">
    <!-- 搜索查询栏 -->
    <top-search
      :add="true"
      addText="添加角色"
      @addfn="addRole"
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
    >
    </my-table>
    <!-- 输入弹窗 -->
    <el-dialog
      :title="editType === 0 ? '添加角色' : '修改角色'"
      :visible.sync="editBox"
      :append-to-body="true"
    >
      <el-form :model="roleInfo">
        <el-form-item label="角色名称" :label-width="inputWid" required>
          <el-input
            size="medium"
            v-model="roleInfo.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否管理员" :label-width="inputWid" required>
          <el-select v-model="roleInfo.isAdmin" placeholder="是否管理员">
            <el-option label="是" :value="num[1]"></el-option>
            <el-option label="否" :value="num[0]"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="inputWid" required>
          <!-- <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="selAll"
            @change="selAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="roleInfo.menuId"
            @change="selSingleChange"
          >
            <el-checkbox
              v-for="item in authority"
              :label="item.value"
              :key="item.id"
              >{{ item.title }}</el-checkbox
            >
          </el-checkbox-group> -->
          <div class="tree-node">
            <el-checkbox v-model="selAll" @change="selAllChange" style="padding-left: 7px;">全选</el-checkbox>
            <el-tree
              :data="authority"
              show-checkbox
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
              @check-change="selSingleChange"
            >
            </el-tree>
          </div>
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
      authority: [
        {
          id: 1,
          label: "流调管理",
          children: [
            {
              id: 4,
              label: "流调管理",
              children: [
                {
                  id: 9,
                  label: "流调管理",
                },
                {
                  id: 10,
                  label: "流调管理",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "流调管理",
          children: [
            {
              id: 5,
              label: "流调管理",
            },
            {
              id: 6,
              label: "流调管理",
            },
          ],
        },
        {
          id: 3,
          label: "流调管理",
          children: [
            {
              id: 7,
              label: "流调管理",
            },
            {
              id: 8,
              label: "流调管理",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      num: [0, 1],
      selAll: false,
      isIndeterminate: true,
      editBox: false,
      editType: 0,
      roleInfo: {
        roleName: "",
        isAdmin: 0,
        menuId: [],
      },
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
          title: "角色",
          key: "roleName",
          width: undefined,
        },
        {
          title: "权限",
          key: "menuName",
          width: undefined,
        },
      ],
      action: {
        title: "操作",
        width: undefined,
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
  methods: {
    // 全选
    selAllChange(val) {
      let arr = val ? [1,2,3,4,5,6,7,8,9,10] : [];
      this.$refs.tree.setCheckedKeys(arr);
    },
    // 获取全部勾选的
    getAllSel() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    // 单选
    selSingleChange() {
      let result = this.$refs.tree.getCheckedKeys();
      if(result.length >= 10) {
        this.selAll = true;
      }else {
        this.selAll = false;
      }
    },
    // 加载列表数据
    loadData() {
      this.$axios
        .get("/api/nesarc/role/getData")
        .then((res) => {
          let datas = res.response.data.rows;
          this.dataSource = [...datas];
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
    addRole() {
      this.editBox = true;
      this.editType = 0;
    },
    // 确定添加角色
    sureAddUser() {
      this.getAllSel();
      // if (this.roleInfo.roleName === "") {
      //   return this.$message({
      //     message: "请输入角色名称!",
      //     type: "error",
      //   });
      // } else if (this.roleInfo.menuId.length <= 0) {
      //   return this.$message({
      //     message: "请选择菜单权限!",
      //     type: "error",
      //   });
      // }
      // let data = { ...this.roleInfo, menuId: this.roleInfo.menuId.join(",") };
      // this.$axios
      //   .post("/api/nesarc/role/save", data)
      //   .then((res) => {
      //     if (res.success) {
      //       this.loadData();
      //       this.editBox = false;
      //       this.clearInfo();
      //       this.$message({
      //         message: "角色添加成功!",
      //         type: "success",
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message({
      //       message: "添加失败!",
      //       type: "error",
      //     });
      //   });
    },
    // 清楚输入框历史信息
    clearInfo() {
      this.roleInfo = {
        roleName: "",
        isAdmin: 0,
        menuId: [],
      };
    },
    // 删除角色
    delData(id) {
      this.$confirm("即将删除该角色, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/api/nesarc/role/remove", {
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
    // 修改角色
    modifyData(id) {
      console.log(id);
    },
    sizeChange(val) {
      console.log(val);
    },
    currentChange(val) {
      console.log(val);
    },
  },
  created() {
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