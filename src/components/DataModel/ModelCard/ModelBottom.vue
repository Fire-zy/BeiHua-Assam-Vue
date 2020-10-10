<template>
  <el-card body-style="padding:15px" class="main-bottom" shadow="hover">
    <div class="bottom-card">
      <div></div>
      <div class="btnbox">
        <el-button @click="back">上一步</el-button>
        <el-button>取 消</el-button>
        <el-button   type="primary"
          >保 存</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  methods: {
    
    //上一步
    back() {
      this.$parent.back();
    },
  },
};
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