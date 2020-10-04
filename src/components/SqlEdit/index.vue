<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    fit
    :default-sort = "{prop: 'sourceName', order: 'ascending'}"
    >
    <el-table-column
      prop="sourceName"
      label="名称"
      sortable
      width="200px"
      >
    </el-table-column>
    <el-table-column
      prop="dataSourceUrl"
      label="数据库Url"
      >
    </el-table-column>
    <el-table-column
      prop="dataSourceType"
      label="类型"
      width="200px"
      >
    </el-table-column>
    <el-table-column
      prop="caozuo"
      label="操作"
      width="200px"
      :formatter="formatter">
      <template slot-scope="scope">
        <el-button v-waves  icon="el-icon-edit" circle></el-button>
        <el-button v-waves  icon="el-icon-refresh-right" circle></el-button>
        <el-button v-waves  icon="el-icon-delete" circle @click.native.prevent="removeid(scope.$index, tableData,scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令
import {querysource,remove} from '@/api/user'

export default {
    data() {
      return {
        tableData: [],
        dataSourceId:''
      }
    },
  directives: {
    waves
  },
  created() {
    //添加之后刷新数据
    this.getList()
  },
  methods: {
    // 查询数据源
    getList(){
      querysource().then(resp=>{
        this.tableData=resp.data
      })
    },
    // 按指定id删除数据源
    removeid(index, rows, id) {
      event.stopPropagation()//不再派发事件。

      this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1)
        remove({'dataSourceId':id}).then(resp => {
          if (resp.code == 200) {
            this.getList(),
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    formatter(row, column) {
        return row.caozuo;
    },
 
  }
}
</script>


<style scoped>
  
</style>

