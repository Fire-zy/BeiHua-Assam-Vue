<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    fit
    :default-sort = "{prop: 'name', order: 'descending'}"
    >
    <el-table-column
      prop="name"
      label="名称"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="leixing"
      label="类型"
      >
    </el-table-column>
    <el-table-column
      prop="caozuo"
      label="操作"
      :formatter="formatter">
       <el-button v-waves  icon="el-icon-edit" circle></el-button>
       <el-button v-waves  icon="el-icon-refresh-right" circle></el-button>
       <el-button v-waves  icon="el-icon-delete" circle></el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令

export default {
    data() {
      return {
        tableData: [{
          name: 'test1',
          description: '这是描述',
          leixing: 'JDBC',
        }, {
          name: 'test2',
          description: '这是描述',
          leixing: 'JDBC',
        }, {
          name: 'test3',
          description: '这是描述',
          leixing: 'JDBC',
        }, {
          name: 'test4',
          description: '这是描述',
          leixing: 'JDBC',
        }]
      }
    },
  directives: {
    waves
  },
  created() {
  },
  methods: {
    formatter(row, column) {
        return row.caozuo;
    }
  }
}
</script>


<style scoped>
  
</style>

