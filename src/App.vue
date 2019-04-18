<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>
<!--解决表头错位-->
<style>
  body .el-table th.gutter{
    display: table-cell!important;
  }

  body .el-table colgroup.gutter{
    display: table-cell!important;
  }
</style>

