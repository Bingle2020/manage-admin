<template>
  <div class="search-wrap">
    <span class="title">
      <i class="el-icon-search b"></i>
      查询
    </span>
    <el-divider></el-divider>
    <!-- 搜索区 -->
    <div class="search" v-for="(items,i) in keyObj" :key="i">
      <el-select v-model="items.key" placeholder="搜索条件" width="100px">
        <el-option
          v-for="item in options"
          :key="item"
          :label="keys[item]"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-input v-model="items.value" placeholder="请输入关键词"></el-input>
    </div>
    <!-- 添加搜索条件 -->
    <div class="search plus-input" v-if="keyObj.length < 2">
      <i @click="plusSearch" class="el-icon-plus" title="添加条件"></i>
    </div>
    <div class="search plus-input" v-else>
      <i @click="minusSearch" class="el-icon-minus" title="删除条件"></i>
    </div>
    <!-- 查询 -->
    <div class="search rt to-search">
      <el-button @click="search" class="ab" type="primary" round>查询</el-button>
    </div>
    <!-- 重置 -->
    <div class="search rt to-search reset">
      <el-button @click="resetSearch" class="ab" type="success" icon="el-icon-refresh" round>重置</el-button>
    </div>
    <!-- 添加类型按钮 -->
    <div v-if="add" class="search rt to-search operate">
      <el-button type="primary" @click="addfn" class="ab add" round>{{ addText }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keysObj: [
        {
          key: '',
          value: ''
        }
      ]
    };
  },
  computed: {
    keyObj() {
      return this.keysObj
    },
    options() {
      return Object.keys(this.keys);
    },
  },
  props: {
    keys: {
      type: Object,
      default: () => ({}),
    },
    add: {
      type: Boolean,
      default: () => false
    },
    addText: {
      type: String,
      default: () => '添加'
    },
  },
  methods: {
    // 搜索
    search() {
      let sendObj = {};
      for(let i = 0,len = this.keysObj.length; i < len; i++) {
        if(this.keysObj[i].key && this.keysObj[i].value) {
          sendObj[this.keysObj[i].key] = this.keysObj[i].value;
        }
      }
      this.$emit('search',sendObj);
    },
    // 添加搜索条件
    plusSearch() {
      this.keysObj.push({key: '', value: ''});
    },
    minusSearch() {
      this.keysObj.pop();
    },
    // 重置条件
    resetSearch() {
      this.keysObj.forEach(item => {
        item.key = '';
        item.value = ''
      });
    },
    // 添加
    addfn() {
      this.$emit('addfn');
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  height: 83px;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
  // overflow: hidden;
  .title {
    padding-top: 10px;
    text-align: center;
    width: 70px;
    height: 22px;
    line-height: 22px;
    display: block;
    font-family: fangsong;
  }
  .search {
    float: left;
    margin-right: 20px;
    &.plus-input {
      line-height: 40px;
      margin: 0;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .to-search {
    margin: 0 0 0 20px ;
    width: 55px;
    height: 40px;
    .ab {
      width: 100%;
      height: 30px;
      top: 0;
      bottom: 0;
      margin: auto;
      padding: 0;
      line-height: 30px;
    }
    &.operate {
      width: 80px;
      float: right;
      margin: 0 20px;
    }
  }
  .reset {
    width: 65px;
  }
  .el-input {
    width: 150px;
    /deep/ .el-input__inner {
      border-radius: 15px;
    }
  }
}
</style>