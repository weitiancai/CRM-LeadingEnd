<template>
 <section>
   <div v-if="type==1">
     <el-row v-for="(item,index) in imgList">
       <img :src="item" />
     </el-row>
   </div>
   <div v-if="type==2">
     <table>
       <tr v-for="(item,index) in excelList">
         <template v-for="(items,indexs) in item">
           <td>{{items}}</td>
         </template>
       </tr>
     </table>
   </div>
 </section>
</template>

<script>


    export default {
        name: "preview-file",
      data() {
        return {
          type:undefined,
          imgList:[],
          excelList:[]
        }
      },
      methods: {

      },
      created() {

      }
    }
</script>

<style scoped>
  th,td
  {
    border:1px solid black;
  }
</style>
