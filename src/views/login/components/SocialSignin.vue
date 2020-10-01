<template>
  <div class="social-signup-container">
    <el-form
      :model="addForm"
      status-icon
      :rules="rules"
      ref="addForm"
      label-width="100px"
      class="demo-addForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="addForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('addForm')"
          >提交</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import openWindow from '@/utils/open-window'
import {regist} from '@/api/user'
import axios from 'axios'

export default {
  name: "SocialSignin",
  // 表单验证
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.addForm.checkPass !== "") {
          this.$refs.addForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      addForm:{
        username:'',
        password:''
      },
      showDialog:false,
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          regist(this.addForm).then(resp=>{
            if(resp.code==200){
                this.$emit('show',this.showDialog)
                this.$refs[formName].resetFields();
                this.$message({
                  message: '恭喜你，注册成功',
                  type: 'success'
                });
            }else{
              this.$message({
                message: '注册失败',
                type: 'warning'
              });
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<style lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;

  // .el-form{
  //   width: 520px;
  // }
  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }
  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }
  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }
  .wx-svg-container {
    background-color: #24da70;
  }
  .qq-svg-container {
    background-color: #6ba2d6;
    margin-left: 50px;
  }
}
</style>
