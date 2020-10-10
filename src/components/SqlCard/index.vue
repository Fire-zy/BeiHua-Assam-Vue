<template>
  <!-- 主要模块 -->
  <div class="main">
    <info-list @infolistMsg="infolistMsg"></info-list>

    <!-- 区域右边 -->
    <div class="main-right">
      <!-- 数据展示区 -->
      <sql-editor @sqleditor="sqleditor" ref="child"></sql-editor>
      <sql-table></sql-table>
      <!-- 底部操作 -->
      <bottom-card></bottom-card>
    </div>
  </div>
</template>

<script>
import {
  getSourceList,
  dataconnect,
  addsource,
  querysource,
  sqlTest,
} from "@/api/user";
import waves from "@/directive/waves/index.js"; // 水波纹指令

import SqlTable from "@/components/SqlCard/SqlTable";
import InfoList from "@/components/SqlCard/InfoList";
import SqlEditor from "@/components/SqlCard/SqlEditor";
import BottomCard from "@/components/SqlCard/BottomCard";

export default {
  directives: {
    waves,
  },
  components: { SqlTable, InfoList, SqlEditor,BottomCard   },
  data() {
    return {
      sqlStr:'',
      tenantDatasourceConfigId:'1003',//暂时默认
      formLabelWidth: "120px",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  created() {},
  methods: {
    
    infolistMsg(msg){
      this.tenantDatasourceConfigId=msg
    },
    sqleditor(msg){
      // console.log(msg)
      this.sqlStr=msg
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //上一步
      back() {
          this.$parent.back();
      },
      //下一步
      next() {
      this.$parent.next();
      },
  },
};
</script>


<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 20px;
}
/* 右边的main块 */
.main-right {
  width: 100%;
  height: 550px;
  margin: 5px;
}



/* 滚动条 */
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-tree > .el-tree-node {
  /* //这里的高根据实际情况 */
  height: 350px;
  min-width: 100%;
  display: inline-block;
}
</style>

