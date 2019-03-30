<template>
  <section>
    <!--工具栏-->
    <el-col>
      <el-button @click="reload" icon="el-icon-arrow-left" circle style="float: left"></el-button>
      <el-tag style="margin-left: 1vw;margin-top: 1vh">{{name}}</el-tag>
    </el-col>
    <!--主页面-->
    <el-main class="tabZujian">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="详细信息" name="first" :key="'first'">
          <child1 v-if="isChildUpdate1"></child1>
        </el-tab-pane>

        <el-tab-pane label="硬件" name="second" :key="'second'">
          <child2 v-if="isChildUpdate2"></child2>
        </el-tab-pane>

        <el-tab-pane label="软件" name="third" :key="'third'">
          <child3 v-if="isChildUpdate3"></child3>
        </el-tab-pane>

        <el-tab-pane label="文件" name="fourth" :key="'fourth'">
          <child4 v-if="isChildUpdate4"></child4>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </section>
</template>

<script>
  import infoDetail from './infoDetail'
  import hardware from './hardware'
  import software from './software'
  import document from './document'
  import ElMain from "element-ui/packages/main/src/main";

  export default {
    name: "customer-detail",
    components: {
      ElMain,
      child1: infoDetail,
      child2: hardware,
      child3: software,
      child4: document
    },
    data() {
      return {
        activeName: "second",
        isChildUpdate1: false,
        isChildUpdate2: true,
        isChildUpdate3: false,
        isChildUpdate4: false,
        name: '',
      }
    },
    created() {
      this.name = this.$route.query.name;
    },
    methods: {
      handleClick(tab) {
        if (tab.name == "first") {
          this.isChildUpdate1 = true;
          this.isChildUpdate2 = false;
          this.isChildUpdate3 = false;
          this.isChildUpdate4 = false;
        } else if (tab.name == "second") {
          this.isChildUpdate1 = false;
          this.isChildUpdate2 = true;
          this.isChildUpdate3 = false;
          this.isChildUpdate4 = false;
        } else if (tab.name == "third") {
          this.isChildUpdate1 = false;
          this.isChildUpdate2 = false;
          this.isChildUpdate3 = true;
          this.isChildUpdate4 = false;
        } else if (tab.name == "fourth") {
          this.isChildUpdate1 = false;
          this.isChildUpdate2 = false;
          this.isChildUpdate3 = false;
          this.isChildUpdate4 = true;
        }
      },
      reload() {
        this.$router.push({path: '/home'});
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    },
  }
</script>

<style scoped>

</style>
