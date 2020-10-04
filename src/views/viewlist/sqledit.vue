<template>
  <div class="tab-container">
    <div class="headerSteps">
      <el-steps class="steps" :space="200" :active="active" finish-status="finish">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>

<!-- 主要模块 -->
    <div class="main">
      <!-- 区域左边 -->
      <div class="main-left">
        <!-- 数据试图表单 -->
        <div class="dataForm">dataform</div>
        <!-- 数据源信息 -->
        <div class="dataInformation">dataInformation</div>
      </div>
      <!-- 区域右边 -->
      <div class="main-right">
        <!-- sql编辑 -->
        <div class="sqleditor-box">
          <!-- SQL编辑区 -->
          <div class="sqledit">sqledit</div>
          <!-- 变量声明区 -->
          <div class="variable">variable</div>
        </div>
        <!-- 数据展示区 -->
        <div class="showdata">showdata</div>
        <!-- 底部操作 -->
        <div class="main-bottom">bottom</div>
      </div>
    </div>


    <!-- <el-col :span="8">
      <el-card shadow="hover">
        鼠标悬浮时显示
      </el-card>
    </el-col> -->
  </div>
</template>

<script>
import {dataconnect,addsource,querysource} from '@/api/user'
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "sqledit",
  directives: {
    waves,
  },
  components: {   },
  data() {
    return {
      active: 0
    };
  },
  watch: {},
  created() {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
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

.headerSteps{
  display: flex;
  justify-content: center;
}

.steps{
  margin-left: 100px;
  width: 250px;
  height: 50px;
}

.main{
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 20px;
}
/* 左边样式 */
.main-left{
  width: 20%;
  height: 550px;
}

.dataForm{
  width: 100%;
  height: 40%;
  background-color: blueviolet;
}

.dataInformation{
  width: 100%;
  height: 60%;
  background-color: rgb(226, 43, 171);
}

/* 右边样式 */
.main-right{
  width: 80%;
  height: 550px;
  background-color: rgb(43, 255, 0);
}

.sqleditor-box{
  display: flex;
  width: 100%;
  height: 50%;
  background-color: rgb(0, 68, 255);
}

 .sqledit{
  width: 70%;
  height: 100%;
  background-color: rgb(0, 174, 255);
} 
 
 .variable{
  width: 30%;
  height: 100%;
  background-color: rgb(94, 255, 0);
} 

.showdata{
  width: 100%;
  height: 40%;
  background-color: rgb(255, 94, 0);
}

.main-bottom{
  width: 100%;
  height: 10%;
  background-color: rgb(43, 255, 0);
}
</style>
