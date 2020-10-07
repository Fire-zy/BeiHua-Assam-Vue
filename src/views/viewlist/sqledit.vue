<template>
  <div class="tab-container">
    <div class="headerSteps">
      <el-steps
        class="steps"
        :space="200"
        :active="active"
        finish-status="finish"
      >
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
      </el-steps>
    </div>

    <view-card></view-card>
  </div>
</template>

<script>
import { getSourceList, dataconnect, addsource, querysource } from "@/api/user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import ViewCard from "@/components/ViewCard";

export default {
  name: "sqledit",
  components: { ViewCard },
  data(){
    return{
      active: 0,
    }
  },
  methods:{
    //下一步
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    //上一步
    back(){
      --this.active
      if (this.active < 0) this.active = 0;
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}

.headerSteps {
  display: flex;
  justify-content: center;
}

.steps {
  margin-left: 100px;
  width: 250px;
  height: 50px;
}


</style>
