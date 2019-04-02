<!--suppress ALL -->
<template>
  <section>

    <el-row>
      <el-col :span="6" style="margin-top:3%;margin-left:2%;">
        <el-tree
          :data="treeList"
          :props="defaultProps"
          :render-content="renderContent"
          node-key="id"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-col>
      <el-col :span="16"><div class=" bg-purple1" >
        <el-upload
          name="file"
          :on-success="onSuccess"
          :on-error="onError"
          ref="upload"
          :action=url
          :data="ufile"
          :dropdownlist="false"
          :before-upload="beuploadfile"
          v-show="upshow"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-table
          :data="treechildList"
          :props="defaultProps"
          empty-text=" "
          style="width: 100%">a
          <el-table-column
            prop="name"
            label="文件名"
            width="240"
            height="60">
            <template slot-scope="scope">
            <span style="margin-left: 5px;font-size: 20px" >
              <svg-icon v-if="scope.row.filetype==='txt'" icon-class="txt" />
              <svg-icon v-if="scope.row.filetype==='word'" icon-class="word" />
              <svg-icon v-if="scope.row.filetype==='pdf'" icon-class="pdf" />
              <svg-icon v-if="scope.row.filetype==='ppt'" icon-class="ppt" />
              <svg-icon v-if="scope.row.filetype==='null'" icon-class="null" />
              <svg-icon v-if="scope.row.filetype==='excel'" icon-class="excel" />
              {{ scope.row.name }}
            </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="comment"
            label="简介">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="dos"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="filedown(scope.$index, scope.row)">
                <a  :href="downaddress" :download="downfilename" @click="clear"> 下载</a>
              </el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="fileEdit(scope.$index, scope.row)"
                style="margin-left: -1px">编辑</el-button>
              <el-dropdown >
                <el-button
                  size="mini"
                  type="info"
                  @click="filemore(scope.$index, scope.row)"
                  style="margin-left: -1px">更多</el-button>
                <el-dropdown-menu slot="dropdown" style="margin:-10px;">
                  <el-dropdown-item >预览</el-dropdown-item>
                  <el-dropdown-item >删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </template>
          </el-table-column>
        </el-table>

        <el-table
          :data="treesonList"
          :props="defaultProps"
          @row-click="backfiles"
          empty-text=" "
          style="width: 100%">
          <el-table-column
            prop="name"
            label="文件夹名"
            width="240"
            height="60">
            <template slot-scope="scope">
            <span style="margin-left: 5px;font-size: 20px" >
              <svg-icon  icon-class="p1" />
              {{ scope.row.name }}
            </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="comment"
            label="简介">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间">
          </el-table-column>

        </el-table>
      </div></el-col>
    </el-row>
    <!--新增节点-->
    <!-- <el-dialog :title="formTitle" :visible.sync="formVisible" :close-on-click-modal="false">
       <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
         <el-form-item label="名称" prop="name">
           <el-input  v-model="formData.name" @keyup.enter.native="add"   ></el-input>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click.native="formVisible = false">取消</el-button>
         <el-button type="primary" v-on:click="add" :loading="submitLoading">提交</el-button>
       </div>
     </el-dialog>-->

    <!--<el-dialog :title="formTitle" :visible.sync="formVisiblemore" :close-on-click-modal="false">
      <el-radio v-model="radio" label="1" style="margin-left:15%">新建子文件夹</el-radio>
      <el-radio v-model="radio" label="2">编辑文件夹</el-radio>
      <el-radio v-model="radio" label="3">删除文件夹</el-radio>
      <el-radio v-model="radio" label="4">上传文件夹</el-radio>

      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData" v-if="radio==='1'">
        <el-form-item label="名称" prop="name">
          <el-input  v-model="formData.name" @keyup.enter.native="add"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="radio==='1'">
        <el-button @click.native="formVisibleson = false">取消</el-button>
        <el-button type="primary" v-on:click="add" :loading="submitLoading">提交</el-button>
      </div>
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData" v-if="radio==='2'">
        <el-form-item label="编辑名称" prop="name">
          <el-input  v-model="formData.name" @keyup.enter.native="addEventFormSubmitBtn()"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="radio==='2'">
        <el-button @click.native="formVisibleedit = false">取消</el-button>
        <el-button type="primary" v-on:click="editSubmitBtn()" :loading="submitLoading">提交</el-button>
      </div>
    </el-dialog>-->




    <el-dialog :title="formTitle" :visible.sync="formVisibleson" :close-on-click-modal="false">
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="名称" prop="name">
          <el-input  v-model="formData.name" @keyup.enter.native="add"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisibleson = false">取消</el-button>
        <el-button type="primary" v-on:click="add" :loading="submitLoading">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="formTitle" :visible.sync="formVisibleedit" :close-on-click-modal="false">
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="编辑名称" prop="name">
          <el-input  v-model="formData.name" @keyup.enter.native="editSubmitBtn()"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisibleedit = false">取消</el-button>
        <el-button type="primary" v-on:click="editSubmitBtn()" :loading="submitLoading">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="formTitle" :visible.sync="formVisibleeditfile" :close-on-click-modal="false">
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="编辑名称" prop="name">
          <el-input  v-model="formData.name" @keyup.enter.native="editfileSubmitBtn()"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisibleeditfile = false">取消</el-button>
        <el-button type="primary" v-on:click="editfileSubmitBtn()" :loading="submitLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import {getTreeById,getDocumentChildren,getDocumentChildrens,addDirectory,deleteDirectoryById} from '../api/document'
  import { update,download,updatefile,uploadDocument} from '../api/document'
  export default {
    data() {
      return {
        upshow:false,
        url:'',
        radio:'',
        fileList:[],
        treeList:[],
        sonList:[],
        listLoading:false,
        defaultProps: {
          children: 'children',
          label: 'name',
          filetype:'null',
        },
        typeselect:'',
        formVisiblemore:false,
        formVisibleeditfile:false,
        treesonList:[],
        treechildList:[],
        customerlist:'',
        customerid:'',
        childid:'',
        backid:'',
        downaddress:'',
        downfilename:'',
        fileId:'',
        ufile:{
          name:'',
          upload_user_id:'',
          upload_date:'',
          comment:'',
          customer_id:'',
          document_tree_id:'',
          file:''
        },
        formVisibleedit:false,
        formVisibleson:false,
        formVisible:false,
        formTitle:'',
        editname:'',
        addformData:{
          customerId:'',
          name:'',
          parentId:''
        },
        editformData:{
          customerId:'',
          name:'',
          parentId:'',
          id:''
        },
        editfileformData:{},
        formData: {
          customerid:'',
          name: "",
          parentid:'',
          id:'',
          children:[],
          documentChildren:{
            comment:"",
            customerid:'',
            documentTreeId:'',
            id:'',
            name:"",
            storageName:"",
            uploadDate:'',
            uploadUserId:'',
          }
        },
        formRules: {
          name: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
        },
        submitLoading:false,
      }

    },
    methods: {
      getList(){
        this.customerid=this.customerlist;
        getTreeById(this.customerid).then(res => {
          this.listLoading = false;
          this.treeList=res.data.data;
        }).catch((error) => {
          this.listLoading = false;
          if (error) console.log(error);
        });
      },
      getfileList(){
        getDocumentChildren(this.fileId).then(res=>{
          this.treechildList=res.data.data;
          this.typeselect=res.data.data;
          for(let i=0;i<this.typeselect.length;i++)
          {
            this.typename=this.typeselect[i].name.split(".");
            this.typenamelength=this.typename.length;
            this.filename=this.typename[this.typenamelength-1];
            if(this.filename==='txt')
            {
              this.treechildList[i].filetype='txt';
            }
            else if(this.filename==='doc'||this.filename==='docx')
            {
              this.treechildList[i].filetype='word';
            }
            else if(this.filename==='els'||this.filename==='elsx')
            {
              this.treechildList[i].filetype='excel';
            }
            else if(this.filename==='pdf')
            {
              this.treechildList[i].filetype='pdf';
            }
            else if(this.filename==='ppt')
            {
              this.treechildList[i].filetype='excel';
            }
            else
            {
              this.treechildList[i].filetype='null';
            }
          }

        })
      },
      backfiles(row){
        this.backid=row.id;
        getDocumentChildren(this.backid).then(res=>{
          this.treechildList=res.data.data;
          this.typeselect=res.data.data;
          for(let i=0;i<this.typeselect.length;i++)
          {
            this.typename=this.typeselect[i].name.split(".");
            this.typenamelength=this.typename.length;
            this.filename=this.typename[this.typenamelength-1];
            if(this.filename==='txt')
            {
              this.treechildList[i].filetype='txt';
            }
            else if(this.filename==='doc'||this.filename==='docx')
            {
              this.treechildList[i].filetype='word';
            }
            else if(this.filename==='els'||this.filename==='elsx')
            {
              this.treechildList[i].filetype='excel';
            }
            else if(this.filename==='pdf')
            {
              this.treechildList[i].filetype='pdf';
            }
            else if(this.filename==='ppt')
            {
              this.treechildList[i].filetype='excel';
            }
            else
            {
              this.treechildList[i].filetype='null';
            }
          }

        });
        getDocumentChildrens(this.backid).then(res=>{

          this.treesonList=res.data.data;
        })
      },
      filedown(data,node){
        this.downfilename=node.name;
        download(node.id).then(res=>{
          this.downaddress=res.data.data;
        })
      },
      clear(){
        this.downaddress='';
        this.downfilename='';
      },
      fileEdit(data,node){
        this.formTitle = '修改文件名称';
        this.formVisibleeditfile = true;
        this.formData.id=node.id;
        this.formData.name=node.name;
        this.formData.parentid=this.treesonList.parentId;
        this.editfileformData=node;
      },
      editfileSubmitBtn(){
        this.editfileformData.name=this.formData.name;
        this.fileId=this.editfileformData.documentTreeId;
        this.submitLoading=true;
        updatefile(this.editfileformData).then(res=>{
          if (res.data.code==0) {
            this.$message({
              message: '修改成功',
              type: 'success',
            });
            this.getfileList();
            this.formVisibleeditfile = false;
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            });
          }
          this.submitLoading=false;
        }).catch(error=>{
          console.log(error);
        });
      },
      filemore(data,node){

      },
      /*知识点树*/
      renderContent(h, { node, data, store }){
        return (
          <span class="custom-tree-node">
          <span> <svg-icon icon-class="p1"/> {node.label}</span>
        <span >
        <el-dropdown >
        <el-button class="el-icon-more "  type="text" on-click={ () => this.more(data,node) }></el-button>
        <el-dropdown-menu slot="dropdown" style="margin:-10px;">
          <el-dropdown-item ><el-button  class="el-icon-plus" style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>新建 </el-button>  </el-dropdown-item>
        <el-dropdown-item ><el-button class="el-icon-edit" style="font-size: 12px;color:#8FBC8F" type="text" on-click={ () => this.edit(data,node) }>编辑</el-button></el-dropdown-item>
        <el-dropdown-item ><el-button class="el-icon-delete" style="font-size: 12px;color:#A52A2A" type="text" on-click={ () => this.remove(node,data) }>删除</el-button></el-dropdown-item>
        <el-dropdown-item >上传</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        </span>
        </span>);
      },
      handleNodeClick(data){
        this.upshow=true;
        this.ufile.document_tree_id=data.id;
        this.childid=data.id;
        getDocumentChildren(this.childid).then(res=>{
          this.treechildList=res.data.data;
          this.typeselect=res.data.data;
          for(let i=0;i<this.typeselect.length;i++)
          {
            this.typename=this.typeselect[i].name.split(".");
            this.typenamelength=this.typename.length;
            this.filename=this.typename[this.typenamelength-1];
            if(this.filename==='txt')
            {
              this.treechildList[i].filetype='txt';
            }
            else if(this.filename==='doc'||this.filename==='docx')
            {
              this.treechildList[i].filetype='word';
            }
            else if(this.filename==='els'||this.filename==='elsx')
            {
              this.treechildList[i].filetype='excel';
            }
            else if(this.filename==='pdf')
            {
              this.treechildList[i].filetype='pdf';
            }
            else if(this.filename==='ppt')
            {
              this.treechildList[i].filetype='excel';
            }
            else
            {
              this.treechildList[i].filetype='null';
            }
          }

        })
        getDocumentChildrens(this.childid).then(res=>{
          this.treesonList=res.data.data;
        })
      },

      beuploadfile(file){
        this.ufile.name=file.name;
        this.ufile.customer_id=this.customerid;
      },
      onSuccess: function (response, file) {
        this.$refs.upload.clearFiles();
        getDocumentChildren(this.ufile.document_tree_id).then(res=>{
          this.treechildList=res.data.data;
          this.typeselect=res.data.data;
          for(let i=0;i<this.typeselect.length;i++)
          {
            this.typename=this.typeselect[i].name.split(".");
            this.typenamelength=this.typename.length;
            this.filename=this.typename[this.typenamelength-1];
            if(this.filename==='txt')
            {
              this.treechildList[i].filetype='txt';
            }
            else if(this.filename==='doc'||this.filename==='docx')
            {
              this.treechildList[i].filetype='word';
            }
            else if(this.filename==='els'||this.filename==='elsx')
            {
              this.treechildList[i].filetype='excel';
            }
            else if(this.filename==='pdf')
            {
              this.treechildList[i].filetype='pdf';
            }
            else if(this.filename==='ppt')
            {
              this.treechildList[i].filetype='excel';
            }
            else
            {
              this.treechildList[i].filetype='null';
            }
          }
        })
      },
      onError: function () {
        console.log("文件上传失败");
      },
//增加节点
      add(){
        this.addformData.customerId=this.formData.customerid;
        this.addformData.name=this.formData.name;
        this.addformData.parentId=this.formData.parentid;
        this.submitLoading=true;
        addDirectory(this.addformData).then(res=>{
          if (!res.data.code) {
            this.$message({
              message: '添加文件夹成功',
              type: 'success',
            });
            this.getList();
            this.formVisibleson = false;
            this.formData.parentid='';
            this.formData.name='';
          } else {
            this.$message({
              message: '添加失败',
              type: 'error'
            });
          }
          this.submitLoading=false;
        }).catch(error=>{
          console.log(error);
        });
      },
      append(data) {
        this.formTitle = '新增子文件夹';
        this.formVisibleson = true;
        this.formData.parentid=data.id;
        this.formData.customerid= this.customerid;
      },
      //编辑节点名称
      edit(data){
        this.formTitle = '修改文件夹名称';
        this.formVisibleedit = true;
        this.formData.id=data.id;
        this.formData.name=data.name;
        this.formData.parentid=data.parentId;
        this.editformData=data;
      },
      editSubmitBtn(){
        this.editformData.name=this.formData.name;
        this.submitLoading=true;
        update(this.editformData).then(res=>{
          if (res.data.code==0) {
            this.$message({
              message: '修改成功',
              type: 'success',
            });
            this.getList();
            this.formVisibleedit = false;
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            });
          }
          this.submitLoading=false;
        }).catch(error=>{
          console.log(error);
        });
      },
//删除节点
      remove(node,data){
        let value=data.id;
        this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDirectoryById(value).then(res=> {
            if(!res.data.code) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

            }  this.getList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    mounted() {
      this.url='/api/documenttree/uploadDocument';
      this.customerlist = this.$route.query.id;
      this.getList();
    }
  }

</script>

<style >

  .bg-purple1 {
    background: #E0FFFF;
    border:1px solid #d3dce6;
    box-shadow:-3px -3px 10px rgba(0,0,0,0.5);
    font-size:20px;
    margin-top:2%;
    margin-left:10%;
  }
  .custom-tree-node {
    width:100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    float:right;

  }
  .el-icon-arrow-down {
    font-size: 6px;
  }
</style>
