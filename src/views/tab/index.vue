<template>
  <div class="tab-container">
    <el-tabs style="margin: 30px 0px" type="border-card">
      <!-- 添加的按钮 -->
      <div class="header">
        <div class="header-left">
          <svg-icon icon-class="list" />
          Source List
        </div>
        <div class="component-item">
          <el-button
            @click="dialogFormVisible = true"
            v-waves
            type="primary"
            icon="el-icon-plus"
            circle
          ></el-button>
          <!-- 打开添加的表单 -->
          <el-dialog  title="新增source" :visible.sync="dialogFormVisible" @close="resetForm('form')">
            <el-form :model="form" ref="form" class="demo-ruleForm">
              <el-form-item 
              label="名称" 
              prop="sourceName"
              :label-width="formLabelWidth"
              :rules="{
                required: true, message: '名称不能为空'
              }">
                <el-input v-model="form.sourceName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="dataSourceType" label="数据库类型" :label-width="formLabelWidth">
                <el-select
                  v-model="form.dataSourceType"
                  placeholder="请选择数据库类型"
                  @change="selectFn($event)"
                >
                  <el-option label="mysql" value="mysql"></el-option>
                  <el-option label="oracle" value="oracle"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="driverClassName" label="数据库驱动" :label-width="formLabelWidth">
                <el-input
                  ref="driverClassName"
                  v-model="form.driverClassName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="username" label="数据库用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item 
              label="测试连接" 
              prop="dataSourceUrl"
              :label-width="formLabelWidth"
              :rules="{
                required: true, message: 'Url不能为空'
              }">
                <el-input
                  v-model="form.dataSourceUrl"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="ceshi()" class="ceshi" v-waves type="primary">测试</el-button>
            

            <div slot="footer" class="dialog-footer">
              <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
              <el-button @click="resetForm('form')">重置</el-button>
              <el-button type="primary" @click="submitForm('form')">提交</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <add-data></add-data>
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-tabs>
  </div>
</template>

<script>
import {dataconect} from '@/api/user'
import TabPane from "./components/TabPane";
import AddData from "@/components/AddDataSource";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "Tab",
  directives: {
    waves,
  },
  components: { TabPane, AddData },
  data() {
    return {
      dialogFormVisible: false,
       numberValidateForm: {
          age: ''
        },
      form: {
        sourceName: "",
        dataSourceType: "mysql",
        username: "root",
        password: "uoUSyAEdtKnNwHZVccfz8eTeaVhOLHJ2",
        driverClassName: "com.mysql.jdbc.Driver",
        dataSourceUrl: "jdbc:mysql://localhost:10000/davinci?useSSL=false",
      },
      
      formLabelWidth: "120px",
    };
  },
  watch: {},
  created() {},
  methods: {
    ceshi(){
      dataconect({
        'dataSourceType':this.form.dataSourceType,
        'username':this.form.username,
        'password':this.form.password,
        'driverClassName':this.form.driverClassName,
        'dataSourceUrl':this.form.dataSourceUrl,
      }).then(resp=>{
        
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            alert('submit!');
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    },
    selectFn(e) {
      if(e=='mysql'){
        this.form.driverClassName='com.mysql.jdbc.Driver'
      }else{
        this.form.driverClassName='oracle.jdbc.driver.oracledriver'
      }
      
      this.form.dataSourceUrl="jdbc:"+e+"://"
    }
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
