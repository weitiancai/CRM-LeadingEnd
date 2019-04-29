<template>
 <section>
   <el-col>
     <el-button @click="reload" icon="el-icon-arrow-left" circle style="float: left"></el-button>
   </el-col>

   <el-main>
     <iframe :href="htmlURL" style="width:84vw;height: 70vh"></iframe>
   </el-main>
 </section>
</template>

<script>
  import {preview} from '../api/previewFile'

    export default {
        name: "preview-file",
      data() {
        return {
          preFileInfo:{},

          id:undefined,
          name:undefined,

          htmlURL:'',
        }
      },
      methods: {
        //预览文件
        preFile(){
              preview(this.preFileInfo.id).then(res=>{
                console.log(res);
                if (!res.data.code) {
                  this.htmlURL=res.data;
                }
              }).catch(error=>{
                console.log(error);
              });
        },
        reload() {
          this.$router.push({path: '/customerDetail', query: {id: this.id, name: this.name}});
        }
      },
      created() {
        this.preFileInfo = this.$route.query.preFileInfo;
        this.id=this.$route.query.id;
        this.name=this.$route.query.name;
        this.preFile();
      },
      beforeRouteLeave(to, from, next) {
          to.meta.keepAlive = true;
          next();
      }
    }
</script>

<style scoped>
  th,td
  {
    border:1px solid black;
  }
</style>
