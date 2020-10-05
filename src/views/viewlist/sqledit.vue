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
          <el-col >
            <el-card class="dataForm" shadow="hover">
              <div>
                <el-form ref="form" :model="form" label-width="80px">
                  <el-input placeholder="人员信息" v-model="form.name"></el-input>
                  <el-input placeholder="演示人员信息" v-model="form.showname"></el-input>
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </el-form>
              </div>
            </el-card>
          </el-col>

          <!-- 数据源信息 -->
          <el-col>
            <el-card class="dataInformation" shadow="hover">
              <div>
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input1">
                  </el-input>
              </div>
            </el-card>
          </el-col>
      </div>

      <!-- 区域右边 -->
      <div class="main-right">
        <!-- sql编辑 -->
        <div class="sqleditor-box">
          <!-- SQL编辑区 -->
          <el-col>
            <el-card class="sqledit" shadow="hover">
              <div>
                <el-input
                v-model="inputsql" 
                type="textarea"
                :autosize="{ minRows: 11, maxRows: 16}"
                placeholder="请输入内容"></el-input>
              </div>
            </el-card>
          </el-col>
          
          <!-- 变量声明区 -->
          <el-col>
            <el-card class="variable" shadow="hover">
               <div>
                 <div class="variable-header">
                   <div>变量</div>
                   <div>+</div>
                 </div>
               </div>
            </el-card>
          </el-col>
         
        </div>
        <!-- 数据展示区 -->
        
        <el-col>
          <el-card class="showdata" shadow="hover">
              <div>showdata</div>
          </el-card>
        </el-col>
        <!-- 底部操作 -->
        
        <el-col class="bottom-card">
          <el-card class="main-bottom" shadow="hover">
              <div>
                <div>
                  <!-- <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="sizes, prev, pager, next"
                    :total="1000">
                  </el-pagination> -->
                </div>
                <div>

                </div>
              </div>
          </el-card>
        </el-col>
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
      active: 0,
      input1:'',
      inputsql:'',
      form: {
          name: '',
          showname:'',
          region: ''
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  watch: {},
  created() {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
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
  margin: 5px;
}

.dataForm{
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  background-color: #eaedf1;
}

.dataInformation{
  width: 100%;
  height: 380px;
  background-color: #eaedf1;
}

/* 右边样式 */
.main-right{
  width: 80%;
  height: 550px;
  margin: 5px;
}

.sqleditor-box{
  display: flex;
  width: 100%;
  height: 270px;
  margin-bottom: 10px;
}

 .sqledit{
  width: 620px;
  height: 100%;
  margin-right: 10px;
} 

.demo-input-size{
  width: 600px;
  height: 260px;
}
 
 .variable{
  width: 280px;
  height: 100%;
  background-color: #eaedf1;
} 

.variable-header{
  display: flex;
  justify-content: space-between;
}

.showdata{
  width: 100%;
  height: 240px;
}

.main-bottom{
  width: 100%;
  /* height: 10%; */
  margin-top: 10px;
  /* padding:0; */
  background-color: #eaedf1;
  
}

/* .bottom-card{
  padding: 0;
} */


/* 修改input框 */
.el-input{
  margin-bottom: 15px;
}
</style>
