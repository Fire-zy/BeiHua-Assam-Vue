<template>
  <div class="tab-container">
    <el-tabs style="margin: 30px 0px" type="border-card">
      <!-- 添加的按钮 -->
      <div class="header">
        <div class="header-left">
          <svg-icon icon-class="list" />
          View List
        </div>
        <div class="component-item">
          <el-button
            @click="toSqlEdit"
            v-waves
            type="primary"
            icon="el-icon-plus"
            circle
          ></el-button>
          <!-- 打开添sql编辑器 -->
          
        </div>
      </div>
      <!-- sql表 -->
      <sql-table ref="child"></sql-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-tabs>
  </div>
</template>

<script>
import {dataconnect,addsource,querysource} from '@/api/user'
import SqlTable from "@/components/ViewList/sqltable";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "viewlist",
  directives: {
    waves,
  },
  components: {  SqlTable },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  watch: {},
  created() {},
  methods: {
    toSqlEdit(){
      this.$router.push({ name:'sqledit'})
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}

.ceshi{
  margin-left: 120px;
}

.header {
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.icon-class {
  color: black;
}

.el-pagination {
  margin-top: 20px;
  margin-left: -10px;
}
</style>
