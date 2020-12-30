<template>
  <div class="tree-node">
    <el-checkbox
      style="padding-left: 9px;"
      class="all-sel"
      :indeterminate="!selAll"
      v-model="selAll"
      @change="selAllChange"
      >全选</el-checkbox
    >
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      @check="selSingleChange"
    >
    </el-tree>
  </div>
</template>

<script>
import { recursive } from '@/util/index';
export default {
  data() {
    return {
      selAll: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      ids: []
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    }
  },
  created() {
      this.ids = recursive(this.data, 'id');
  },
  methods: {
    // 设置tree勾选
    setTree(arr) {
      this.$refs.tree.setCheckedKeys(arr);
      this.selAll = arr.length >= this.ids.length ? true : false;
    },
    // 全选
    selAllChange(val) {
      let result = val ? this.ids : [];
      this.$refs.tree.setCheckedKeys(result);
      this.$emit("change", result);
    },
    // 单选
    selSingleChange() {
      let result = this.$refs.tree.getCheckedKeys();
      this.selAll = result.length >= this.ids.length ? true : false;
      this.$emit("change", result);
    },
  },
};
</script>