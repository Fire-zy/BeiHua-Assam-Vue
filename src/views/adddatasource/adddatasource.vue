<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-1" type="success">
      <router-view />
    </el-alert>
    <h1>添加数据源</h1>
  </div>
</template>
<script>
export default {
    name:'adddatasource'
}
</script>