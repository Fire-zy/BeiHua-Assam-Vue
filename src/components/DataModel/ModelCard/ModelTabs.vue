<template>
  <el-card style="height:490px;" shadow="hover">
       <el-radio-group @change="handelClick" v-model="radio" >
            <el-radio :label=1 >维度</el-radio>
            <el-radio :label=2>指标</el-radio>
        </el-radio-group>
     
    <el-table :data="model" style="width: 100%" fit>

      <el-table-column prop="name" label="字段名称"> </el-table-column>

      <el-table-column label="数据类型">
        <el-radio-group @change="handelClick" v-model="radio" >
            <el-radio :label=1 >维度</el-radio>
            <el-radio :label=2>指标</el-radio>
        </el-radio-group>
      </el-table-column>

      <el-table-column prop="visualType" label="可视化类型">
        <el-tag>全部可见</el-tag>
      </el-table-column>

    </el-table>
  </el-card>
  <!-- 
    <el-tab-pane label="Auth">
      <el-table :data="tableData" style="width: 100%" fit>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column label="权限变量设置">
          <el-table-column
            :selectable="checkboxInit"
            prop="setting"
            label="city"
          >
            
            <el-checkbox></el-checkbox>
          </el-table-column>
        </el-table-column>

        <el-table-column prop="field" label="可见字段">
          <el-tag>全部可见</el-tag>
        </el-table-column>
      </el-table>
    </el-tab-pane> -->
</template>

<script>
export default {
  data() {
    return {
      radio:2,
      checked: true,
      model: [
        {
          name: 'nation',
          visualType:'',
          modelType:'',
        },
        
      ]
    };
  },
  methods: {
      handelClick(value){
          this.radio=value
        console.log(value)
      },
      checkboxInit(row, index) {
          console.log(row,index)
      },
      handelChoose1(){
          console.log('这是1')
        //   this.radio=1
      },
      handelChoose2(){
        //   this.radio=2
        console.log('这是2')
      }

    },
    //   切换复选框的状态
    // checkboxInit(row, index) {
    //   if (row.withdrawState == 2) {
    //     //这个判断根据你的情况而定
    //     this.checked = false;
    //     return 0; //不可勾选
    //   } else {
    //     this.checked = true;
    //     return 1; //可勾选
    //   }
    // },
 
};
</script>

<style lang="scss" scoped>
.el-tabs {
  height: 490px;
}
</style>