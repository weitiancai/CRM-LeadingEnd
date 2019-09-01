<template>
  <div class="layout">
    <Layout>
      <Header style="background-color: #a7ede2">
        <div class="layout-logo">{{sysName}}</div>
        <div class="layout-logo" @click="goHome">{{sysName}}</div>
        <div class="layout-nav">
          <i-button type="info" style="color: #fff;float: right;margin-top: 15px" @click="logout()">退出</i-button>
        </div>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <breadcrumb></breadcrumb>
        <Card>
          <div style="min-height:76vh">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center"></Footer>
    </Layout>
  </div>
</template>

<script>
  import Breadcrumb from '../Breadcrumb'

  export default {
    name: "layout",
    data() {
      return {
        sysName: 'CRM',
      }
    },
    components: {
      Breadcrumb
    },
    methods:{
      goHome(){
        this.$router.push({path: '/home'});
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: #fff;
    font-size: 22px;
    text-align: center;
    margin-top: -1.5vh;
  }

  .layout-logo :hover{
    cursor:pointer;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>
