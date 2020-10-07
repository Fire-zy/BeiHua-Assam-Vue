<template>
<!-- 主要模块 -->
<div class="main">
    <!-- 区域左边 -->
    <div class="main-left">
    <!-- 数据试图表单 -->
    <el-card class="dataForm" shadow="hover">
        <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-input placeholder="人员信息" v-model="form.name"></el-input>
            <el-input
            placeholder="演示人员信息"
            v-model="form.showname"
            ></el-input>
            <el-select
            style="width: 100%"
            v-model="form.region"
            placeholder="选择数据库"
            @change="chooseCore($event)"
            >
            <el-option v-for="role in optionList" 
            :label="role.sourceName" 
            :value="role.id" 
            ></el-option>
            </el-select>
        </el-form>
        </div>
    </el-card>

    <!-- 数据源信息 -->
    <el-card class="dataInformation" shadow="hover">
        <div>
        <el-input
            placeholder="搜索表/字段名称"
            prefix-icon="el-icon-search"
            v-model="dataSourceConfigId"
        >
        </el-input>
        </div>
        <div  class="showList">
        <el-scrollbar style="height:100%">
        <el-tree
            :data="dataList"
            :props="defaultProps"
            @node-click="handleNodeClick"
        >
        </el-tree>
        </el-scrollbar>
        </div>
    </el-card>
    </div>

    <!-- 区域右边 -->
    <div class="main-right">
    <!-- sql编辑 -->
    <div class="sqleditor-box">
        <!-- SQL编辑区 -->
        <el-card class="sqledit" shadow="hover">
        <div>
            <el-input
            v-model="sqlStr"
            type="textarea"
            :autosize="{ minRows: 10.5, maxRows: 10.5 }"
            placeholder="请输入内容"
            ></el-input>
        </div>
        </el-card>

        <!-- 变量声明区 -->
        <el-card class="variable" shadow="hover">
        <div>
            <div class="variable-header">
            <div>变量</div>
            <div>
                <el-button
                icon="el-icon-plus"
                type="primary"
                @click="dialogFormVisible = true"
                circle
                ></el-button>
                <variable-dialog :dialogFormVisible="dialogFormVisible" @child-msg="colse"></variable-dialog>
            </div>
            </div>
        </div>
        </el-card>
    </div>
    <!-- 数据展示区 -->

    <el-card class="showdata" shadow="hover">
        <div>showdata</div>
    </el-card>
    <!-- 底部操作 -->

    <el-card body-style="padding:15px" class="main-bottom" shadow="hover">
        <div class="bottom-card">
            <div class="page">展示前500条数据</div>
            <div class="btnbox">
                <el-button @click="back">上一步</el-button>
                <el-button>取 消</el-button>
                <el-button @click="sqltest" class="el-icon-caret-right" type="primary">执 行</el-button>
                <el-button @click="next">下一步</el-button>
            </div>
        </div>
    </el-card>
    </div>
</div>
</template>

<script>
import { getSourceList, dataconnect, addsource, querysource ,sqlTest} from "@/api/user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import VariableDialog from "@/components//SqlEdit/VariableDialog";

export default {
  directives: {
    waves,
  },
  components: { VariableDialog },
  data() {
    return {
        // 最开始弹出层默认false 
        dialogFormVisible:false,   
        formLabelWidth: "120px",  
        optionList:[],
        // 获取列表传值
        dataSourceConfigId: "", 
        //   调用sql测试的id
        tenantDatasourceConfigId:'',
        // 动态绑定sql语句  
        sqlStr: "",    
        // 左边渲染的列表数组         
        dataList: [],                
        defaultProps: {
        label: "label",
        children:"children"
        },
      // 提交表单
      form: {
        name: "",
        showname: "",
        region: "",
      },
      
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  watch: {},
  created() {this.getList()},
  methods: {
      colse(msg){
          this.dialogFormVisible=false
        //   console.log("这就是子组件传过来的" + msg)
      },
    sqltest(){
        sqlTest({
            tenantDatasourceConfigId:this.tenantDatasourceConfigId,
            sqlStr:this.sqlStr
        }).then(resp=>{

        })
    },
    //   获取选择数据库的id
    chooseCore(event){
        this.getSource({dataSourceConfigId:event})
        this.tenantDatasourceConfigId=event
    },
    // 获取数据库名
    getList(){
        querysource().then(resp=>{
            if(resp.code==200){
                for(var i=0;i<resp.data.length;i++){
                    this.optionList.push({sourceName:resp.data[i].sourceName,id:resp.data[i].id})
                }
            }
        })
    },
    // 获取数据库表
    getSource(id) {
    //   var _this=this;
      getSourceList(id).then(
        (res) => {
           let data=res.data;
           let tableInfo=new Array();
           for(var i=0;i<data.length;i++){
             var parm1;
             var parm2;
             var item;
             for(var j in data[i]){
               parm1=j;
               parm2=data[i][j];
               
            //    console.log(parm1,parm2)
               item=this.generation(parm1,parm2);
             }
             tableInfo.push(item);
           }
           this.dataList=tableInfo;
        }
      );
    },
    generation(parm1,parm2){
      let ele={};
      ele.label=parm1,
      ele.children=new Array();

      for(var i=0;i<parm2.length;i++){
        ele.children[i]={};
        ele.children[i].label=parm2[i].COLUMN_NAME;
      }
      return ele;
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
    handleNodeClick(data) {
      console.log(data);
    },
    //下一步
    next() {
      this.$parent.next();
    },
    //上一部
    back(){
        this.$parent.back();
    }
  }
}
</script>


<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 20px;
}
/* 左边样式 */
.main-left {
  width: 20%;
  height: 550px;
  margin: 5px;
}

.dataForm {
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  background-color: #eaedf1;
}

.dataInformation {
  width: 100%;
  height: 380px;
  background-color: #eaedf1;
}

.showList{
  height: 300px;
}


/* 右边样式 */
.main-right {
  width: 80%;
  height: 550px;
  margin: 5px;
}

.sqleditor-box {
  display: flex;
  width: 100%;
  height: 270px;
  margin-bottom: 10px;
}

.sqledit {
  width: 100%;
  height: 100%;
  margin-right: 10px;
}

/* .demo-input-size{
  width: 600px;
  height: 260px;
} */

.variable {
  width: 30%;
  height: 100%;
  background-color: #eaedf1;
}

.variable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.showdata {
  width: 100%;
  height: 210px;
}

.main-bottom {
  width: 100%;
  margin-top: 10px;
  background-color: #eaedf1;
}

.bottom-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-pagination {
  padding: 0;
}

/* 修改input框 */
.el-input {
  margin-bottom: 15px;
}

/* 滚动条 */
.el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;}
.el-tree>.el-tree-node{
/* //这里的高根据实际情况 */
height: 350px; 
min-width: 100%;
display:inline-block;
}

</style>

