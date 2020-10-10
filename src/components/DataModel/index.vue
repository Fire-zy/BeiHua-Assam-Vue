<template>
    <div class="main">
      <model-tabs></model-tabs>
      <model-bottom></model-bottom>
    </div>
</template>
<script>
import ModelBottom from "@/components/DataModel/ModelCard/ModelBottom";
import ModelTabs from "@/components/DataModel/ModelCard/ModelTabs";
export default {
  components: { ModelBottom,ModelTabs   },
    methods:{
      //上一步
      back() {
          this.$parent.back();
      },
    }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  // display: flex;
  margin-top: 20px;
}
</style>