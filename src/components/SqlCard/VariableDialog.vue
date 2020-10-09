<template>
<el-dialog width="35%" title="新增变量" :before-close='colse' :visible.sync="dialogFormVisible">
<el-form
    :model="templateParams"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
>
    <el-form-item label="名称" prop="name">
        <el-input v-model="templateParams.name"></el-input>
    </el-form-item>
    <!-- 类型 -->
    <el-form-item label="类型" prop="type">
        <el-input :disabled="true" v-model="templateParams.type"></el-input>
    </el-form-item>
    <!-- 值类型 -->
    <el-form-item label="值类型" prop="valueType">
    <el-select v-model="templateParams.valueType"  placeholder="请选值类型">
        <el-option label="字符串" value="string" ></el-option>
        <el-option label="数字" value="data"></el-option>
        <el-option label="布尔" value="boolean"></el-option>
        <el-option label="日期" value="date"></el-option>
        <el-option label="SQL表达式"value="sql"></el-option>
    </el-select>
    </el-form-item>

    <!-- `checked` 为 true 或 false -->
    <el-form-item>
        <el-checkbox v-model="checked">使用表达式</el-checkbox>
    </el-form-item>

    <el-form-item v-if="checked" label="表达式">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
    </el-form-item>

    <el-form-item v-else label="默认值">
        <el-input
            v-if="show"
            size="mini"
            @keypress.native.enter="onEnterPress"
            style="width:80px;margin-right:10px;"
            placeholder="请输入内容"
            v-model="templateParams.defaultValues">
            <i slot="suffix" @click="handleIconClick" class="el-icon-close el-input__icon"></i>
        </el-input>
        <el-button v-if="showAdd" size="mini">{{templateParams.defaultValues}}<i @click="handleIconClick2" class="el-icon-close el-icon--right"></i></el-button>
        <el-button type="primary" @click="handleAdd" size="mini">添加<i class="el-icon-plus el-icon--right"></i></el-button>
    </el-form-item>
    
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="colse()">取 消</el-button>
    <el-button @click="addTemplateParams" type="primary">保 存</el-button>
</div>
</el-dialog>
  
</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令
import {querysource,remove} from '@/api/user'

export default {
    data() {
      return {
        show:true,
        // 添加之后展示内容
        showAdd:false,
        
        // 多选框
        checked: false, 
        //文本框
        textarea:'',
        // 表单验证
        templateParams: {              
            name: "",
            valueType: "",
            defaultValues:'',
            type:"查询变量"
        },
        rules: {
            name: [
                { required: true, message: "请输入名称", trigger: "blur" },
            ],
            exspress:''
        },
      }
    },
    props:['dialogFormVisible'],
    directives: {
        waves
    },
    methods:{
        addTemplateParams(){
            this.$emit('addTemplateParams',this.templateParams) 
            this.$emit('child-msg') 
        },
        // 向父组件传值
        colse(){
           this.$emit('child-msg') 
        },
        //点击关闭输入框
        handleIconClick(){
            this.show=false
            this.input4=''
        },
        // 点击添加出现输入框
        handleAdd(){
            this.show=true
            this.showAdd=false
        },
        handleIconClick2(){
            this.showAdd=false
            this.input4=''
        },
        onEnterPress(){
            this.show=false
            this.showAdd=true
        }
    }
}
</script>


<style scoped>
  
</style>

