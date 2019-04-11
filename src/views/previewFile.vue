<template>
 <section>
   <el-col>
     <el-button @click="reload" icon="el-icon-arrow-left" circle style="float: left"></el-button>
   </el-col>

   <el-main>
     <div  v-if="preFileInfo.type===0||preFileInfo.type===1||preFileInfo.type===2||preFileInfo.type===6" >

     </div>
   <div v-if="preFileInfo.type===5||preFileInfo.type===7">
     <el-row v-for="(item,index) in imgList">

     </el-row>
   </div>
   <div v-if="preFileInfo.type===3">
     <table>
       <tr v-for="(item,index) in excelList">
         <template v-for="(items,indexs) in item">
           <td>{{items}}</td>
         </template>
       </tr>
     </table>
   </div>
   </el-main>
 </section>
</template>

<script>
  import {txt2Html,ppt2Image,pdf2Image,readExcelContent,docx2Html,doc2Html,htmlPreview} from '../api/previewFile'

    export default {
        name: "preview-file",
      data() {
        return {
          preFileInfo:{},

          id:undefined,
          name:undefined,

          imgList:[],
          excelList:[],
          htmlPath:undefined,
        }
      },
      methods: {
        //预览文件
        preFile(){
          console.log(this.preFileInfo);
          switch (this.preFileInfo.type){
            case  0:
              htmlPreview(this.preFileInfo.id).then(res=>{
                if (!res.data.code) {

                }
              }).catch(error=>{
                console.log(error);
              });
              break;
            case  1:
              doc2Html(this.preFileInfo.id).then(res=>{
                if (!res.data.code) {
                  console.log(res);
                }
              }).catch(error=>{
                console.log(error);
              });
              break;
            case  2:
              docx2Html(this.preFileInfo.id).then(res=>{
                if (!res.data.code) {
                  console.log(res);
                }
              }).catch(error=>{
                console.log(error);
              });
              break;
            case  3:
              readExcelContent(this.preFileInfo.id).then(res=>{
                if (!res.data.code) {
                  this.excelList=res.data.data.excelContents;
                }
              }).catch(error=>{
                console.log(error);
              });
              break;
            case  5:
              ppt2Image(this.preFileInfo.id).then(res=>{
                if (!res.data.code) {
                  console.log(res);
                }
              }).catch(error=>{
                console.log(error);
              });
              break;
            case  6:
              txt2Html(this.preFileInfo.id).then(res=>{
                if (!res.data.code) {
                  console.log(res);
                }
              }).catch(error=>{
                console.log(error);
              });
              break;
            case  7:
              pdf2Image(this.preFileInfo.id).then(res=>{
                if (!res.data.code) {
                  console.log(res);
                }
              }).catch(error=>{
                console.log(error);
              });
              break;
            default:
              this.$message({
                message: '抱歉该文件格式目前不支持预览',
                type: 'warning'
              });
          }
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
