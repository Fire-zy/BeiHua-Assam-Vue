<template>
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
      <!-- 变量的头部 -->
      <div class="variable-header">
        <div>变量</div>
        <div>
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="dialogFormVisible = true"
            circle
          ></el-button>
          <variable-dialog
            @addTemplateParams="addTemplate"
            :dialogFormVisible="dialogFormVisible"
            @child-msg="colse"
          ></variable-dialog>
        </div>
      </div>
      <!-- 添加的变量展示 -->
      <div style="height: 210px">
        <el-scrollbar style="height: 100%">
          <div v-if="showtag" class="tags" v-for="tag in tags">
            <el-tag size="mini" type="success"> Query </el-tag>
            {{ tag.name }}
          </div>
        </el-scrollbar>
      </div>
    </el-card>
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
import VariableDialog from "@/components//SqlCard/VariableDialog";

export default {
  data() {
    return {
      showtag: false,
      tags: [],
      // 最开始弹出层默认false
      dialogFormVisible: false,
      // 动态绑定sql语句
      sqlStr: "select * from tenant_account where $param$",//暂时默认
    };
  },
  components: { VariableDialog },
// 计算属性截取字符串
  computed:{
    ipaddrArray(){
      // 截取查询语句的param
      return this.sqlStr.split('$')
    }
  },
  created() {
    this.showTags();
  },
  methods: {
    toSql(){
      // 截取查询语句的param
      console.log(this.ipaddrArray)
      let obj=this.ipaddrArray[1]
      // 在右边变量查询有无param
      var res = JSON.parse(localStorage.getItem("tags"));
      for(var i=0;i<res.length;i++){
        if(obj==res[i].name){
          // console.log(成功匹配属性)
          console.log(res[i])
          this.sqlStr=this.ipaddrArray[0]+res[i].defaultValues
        }
      }
      this.$emit('sqleditor',this.sqlStr)
    },
    // 判断本地是否有数据保存，如果有就展示出来
    showTags() {
      var res = JSON.parse(localStorage.getItem("tags"));
      if (res != null) {
        this.tags = res;
        this.showtag = true;
      }
    },
    // 向数组列表添加数据
    addTemplate(msg) {
      this.showtag = true;
      const cloneObj = JSON.parse(JSON.stringify(msg));
      this.tags.push(cloneObj);
      localStorage.setItem("tags", JSON.stringify(this.tags)); // data是一个对象数组  [{},{},....]
    },
    // 关闭弹窗
    colse(msg) {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
/* 右边样式 */

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

.tags {
  width: 100%;
  height: 35px;
  font-size: 12px;
}
</style>