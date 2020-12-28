<template>
  <div class="table-wrap" ref="table" :style="{}">
    <span class="title">
      <i class="el-icon-edit-outline"></i>
      {{ title }}
    </span>
    <el-divider></el-divider>
    <!-- 数据列表 -->
    <div class="table-box">
      <el-table :data="sources"
                height="100%"
                border
                stripe
                style="width: 100%">
        <el-table-column v-for="(item,i) in columns"
                         :prop="item.key"
                         :label="item.title"
                         :width="item.width"
                         :key="i">
        </el-table-column>
        <el-table-column v-if="Object.keys(actions).length > 0" fixed="right" :label="actions.title">
          <template slot-scope="scope">
            <el-button v-for="(item,i) in actions.actions"
                       @click="handleClick(item.fn, scope.row)"
                       :type="item.type"
                       :icon="item.icon"
                       size="small"
                       round
                       :key="i">
                {{ item.edit }}
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!-- 分页 -->
    <div class="splitPage" v-if="splitPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, sizes, total"
        :total="sources.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage1: 1,
    };
  },
  props: {
    high: {
      type: String,
      default: () => "auto",
    },
    title: String,
    sources: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        default: () => []
    },
    actions: {
        type: Object,
        default: () => {}
    },
    splitPage: {
        type: Boolean,
        default: () => false
    },
    pageSize: {
        type: Number,
        default: () => 50
    },
    pageSizes: {
        type: Array,
        default: () => [50,100,150,200]
    },
  },
  computed: {},
  methods: {
    handleClick(fn,row) {
        let obj = {
            fn,
            data: row
        };
        this.$emit('clickFn',obj);
    },
    handleSizeChange(val) {
        this.$emit('sizeChange',val);
    },
    handleCurrentChange(val) {
        this.$emit('currentChange',val);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrap {
position: relative;
  height: calc(100% - 103px);
  background-color: white;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  overflow: hidden;
  .title {
    padding-top: 10px;
    text-align: center;
    width: 100px;
    height: 22px;
    line-height: 22px;
    display: block;
    font-family: fangsong;
  }
  .table-box {
      height: calc(100% - 95px);
  }
  .splitPage {
      margin: 10px;
      position: absolute;
      bottom: 0;
  }
}
</style>