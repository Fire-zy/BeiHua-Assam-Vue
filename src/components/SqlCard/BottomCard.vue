<template>
    <el-card body-style="padding:15px" class="main-bottom" shadow="hover">
        <div class="bottom-card">
          <div class="page">展示前500条数据</div>
          <div class="btnbox">
            <el-button @click="back">上一步</el-button>
            <el-button>取 消</el-button>
            <el-button
              @click="sqltest"
              class="el-icon-caret-right"
              type="primary"
              >执 行</el-button
            >
            <el-button @click="next">下一步</el-button>
          </div>
        </div>
    </el-card>
</template>

<script>
export default {
    methods:{
        //  sql测试
        sqltest() {
        //触发子组件传sql过来
        this.$refs.child.toSql();
        sqlTest({
            tenantDatasourceConfigId: this.tenantDatasourceConfigId,
            sqlStr: this.sqlStr,
        }).then((resp) => {});
        },
        //上一步
        back() {
            this.$parent.back();
        },
        //下一步
        next() {
        this.$parent.next();
        },
    }
}
</script>

<style lang="scss" scoped>
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
</style>