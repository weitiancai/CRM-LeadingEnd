<!--suppress ALL -->
<template>
  <section>

    <el-row>
      <el-col :span="5" style="margin-top:1%;margin-left:2%;" :offset="1">
        <el-button size="small" type="primary" plain @click="ad">新增根文件夹</el-button>
        <el-tree
          :data="treeList"
          :props="defaultProps"
          :render-content="renderContent"
          node-key="id"
          default-expand-all
          :current-node-key="resourceCheckedKey"
          @node-click="handleNodeClick"
          :highlight-current="true"
          empty-text="无文件夹"
        >

        </el-tree>

      </el-col>
      <el-col :span="18"><div class=" bg-purple1" >
        <el-button size="small" type="primary" @click="addfileinfo" v-show="upshow" >点击上传</el-button>
        <p></p>
        <el-table
          :data="treechildList"
          :props="defaultProps"
          empty-text=" "
          style="width: 100%;"
          v-show="upshow"
        >
          <el-table-column
            prop="name"
            label="文件名"
            width="240"
            height="60"
         class="over">
            <template slot-scope="scope">
            <span style="margin-left: 5px;font-size: 20px;" >
                <svg-icon v-if="scope.row.type===-1" icon-class="null" />
              <svg-icon v-if="scope.row.type===0" icon-class="html" />
              <svg-icon v-if="scope.row.type===1" icon-class="word" />
              <svg-icon v-if="scope.row.type===2" icon-class="word" />
              <svg-icon v-if="scope.row.type===3" icon-class="excel" />
              <svg-icon v-if="scope.row.type===4" icon-class="ppt" />
              <svg-icon v-if="scope.row.type===5" icon-class="ppt" />
              <svg-icon v-if="scope.row.type===6" icon-class="txt" />
              <svg-icon v-if="scope.row.type===7" icon-class="pdf" />
              <svg-icon v-if="scope.row.type===8" icon-class="png" />
              <svg-icon v-if="scope.row.type===9" icon-class="bmp" />
              <svg-icon v-if="scope.row.type===10" icon-class="jpg" />
              <svg-icon v-if="scope.row.type===11" icon-class="c" />
              <svg-icon v-if="scope.row.type===12" icon-class="cpp" />
              <svg-icon v-if="scope.row.type===13" icon-class="py" />
              <svg-icon v-if="scope.row.type===14" icon-class="java" />
              <svg-icon v-if="scope.row.type===15" icon-class="class" />
              <svg-icon v-if="scope.row.type===16" icon-class="zip" />
              <svg-icon v-if="scope.row.type===17" icon-class="rar" />
              {{ scope.row.name }}
            </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="comment"
            width="240"
            label="简介">
          </el-table-column>
          <el-table-column
            prop="uploader"
            width="200"
            label="上传人">
          </el-table-column>
          <el-table-column
            prop="uploadDate"
            width="200"
            label="时间">
            <template slot-scope="scope">
              <span>{{scope.row.uploadDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="dos"
            label="操作"
           >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="filedown(scope.$index, scope.row)">
                下载
              </el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="fileupdate(scope.$index, scope.row)"
                style="margin-left: -1px">更新</el-button>
              <el-dropdown  @command="deletedo" trigger="click">
                <el-button
                  size="mini"
                  type="info"
                  @click="filemore(scope.$index, scope.row)"
                  style="margin-left: -1px">更多</el-button>
                <el-dropdown-menu slot="dropdown" style="margin:-10px;">
                    <el-dropdown-item command="preFile">预览</el-dropdown-item>
                  <el-dropdown-item command="a">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </template>
          </el-table-column>
        </el-table>

     <!--文件夹表格

        <el-table
          :data="treesonList"
          :props="defaultProps"
          @row-click="backfiles"
          empty-text=" "
          style="width: 100%"

        >
          <el-table-column
            prop="name"
            label="文件夹名"

            height="60">
            <template slot-scope="scope">
            <span style="margin-left: 5px;font-size: 20px" >
              <svg-icon  icon-class="p1" />
              {{ scope.row.name }}
            </span>
            </template>
          </el-table-column>
         &lt;!&ndash; <el-table-column
            prop="comment"
            label="简介">
          </el-table-column>
          <el-table-column
            prop="uploadDate"
            label="时间">
          </el-table-column>&ndash;&gt;

        </el-table>-->
      </div></el-col>
    </el-row>
    <!--根文件夹添加-->
    <el-dialog :title="formTitle" :visible.sync="formVisibleroot" :close-on-click-modal="false">
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="名称" prop="name">
          <el-input  v-model="formData.name" @keyup.enter.native="addroot"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisibleroot = false">取消</el-button>
        <el-button type="primary" v-on:click="addroot" :loading="submitLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--更新文件-->
   <el-dialog :title="formTitle" :visible.sync="formVisibleupdatefileinfo" :close-on-click-modal="false">
      <el-form :model="updateData" label-width="auto" :rules="formRules" ref="updateData">
        <el-form-item label="为更新文件添加简介" prop="comment">
          <el-input  v-model="updateData.comment" @keyup.enter.native=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-upload ref="update"
                         :data="updateData"
                         :show-file-list="false"
                         :action=updateUrl
                         :on-success="handleSucess"
                         :on-error="handleError"
                         :before-upload="beupdatefile"
                   style="float:right;margin-left:1%"
                       >
          <el-button type="primary" size="small"  :loading="submitLoading">提交</el-button>
        </el-upload>
        <el-button size="small" @click.native="formVisibleupdatefileinfo = false" >取消</el-button>
      </div>
    </el-dialog>
    <!--文件comment介绍-->
    <el-dialog :title="formTitle" :visible.sync="formVisiblefileinfo" :close-on-click-modal="false">
      <el-form :model="ufile" label-width="auto"  ref="ufile">
        <el-form-item label="为上传文件添加简介" prop="comment">
          <el-input  v-model="ufile.comment" ></el-input>
        </el-form-item>
          <el-upload
            multiple
            name="file"
            :on-success="onSuccess"
            :on-error="onError"
            ref="upload"
            :action=url
            :data="ufile"
            :dropdownlist="false"
            :before-upload="beuploadfile"
            v-show="upshow"
            :on-change="fileChange"
            style="float:left;margin-left:1%"
            :auto-upload="false"
          >
           <el-button  type="primary" plain  :loading="submitLoading">文件上传</el-button>
          </el-upload>
        <br><br><br><br><br>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-upload
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
          style="float:right;margin-left:1%"
        >-->
          <el-button type="primary" size="small"  :loading="submitLoading" @click="checkupload">提交</el-button>
        <el-button size="small" @click.native="cancelup" >取消</el-button>
      </div>
    </el-dialog>
    <!--节点添加-->
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


    <!--节点删除-->
   <!-- <el-dialog :title="formTitle" :visible.sync="Visibledel" :close-on-click-modal="false">
      <p style="color:red;font-size:20px;">该节点下的文件夹</p>
      <el-tree
        :data="deletetreesonList"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        :current-node-key="resourceCheckedKey"
        @node-click="deletehandleNodeClick"
        :render-content="renderContent1"
        :highlight-current="true"
        empty-text="无文件夹"
      >
      </el-tree>
      <p style="color:red;font-size:20px;">该节点下的文档</p>
      <el-table
        :data="deletetreechildList"
        :props="defaultProps"
        empty-text="无文档"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="文件名"
          height="60">
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="Visibledel = false">取消</el-button>
        <el-button type="danger" v-on:click="deletesub()" :loading="submitLoading">删除</el-button>
      </div>
    </el-dialog>-->
  </section>
</template>

<script>
  import {getTreeById,getDocumentChildren,getDocumentChildrens,addDirectory,deleteDirectoryById} from '../api/document'
  import { update,download,updatefile,uploadDocument,deleteDocument,getDeleteTreeById,getRoot} from '../api/document'
  import {preview} from '../api/previewFile'
  import '../store/getters.js'

  export default {
    data() {
      return {
        formVisibleroot:false,
        upshow:false,
        formVisiblefileinfo:false,
        formVisibleupdatefileinfo:false,
        uploadDATE:'',
        url:'',
        updateUrl:'',
        radio:'',
        deletedocumentid:'',
        utreechildList:[],
        fileList:[],
        treeList:[],
        deletetreechildList:[],
        deletetreesonList:[],
        sonList:[],
        resourceCheckedKey:'',
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
        backid:0,
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
        updateData:{},
        curstoragename:'',
        formVisibleedit:false,
        formVisibleson:false,
        formVisible:false,
        Visibledel:false,
        formTitle:'',
        editname:'',
        addrootdata:{
          customerId:'',
          name:'',
          parentId:''
        },
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
        preFileInfo:{},
        name:'',
        checknum:'',
        userid:'',
        deletevalue:'',
        wanttodeleteList:[],
        wanttodeletelength:'',
        wantdeletenum:'',
        cnum:0,
      }
    },

    methods: {
      getList(){
        this.userid=this.$store.getters.id;
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
        })
      },
      ad(){
        this.formVisibleroot=true;
        this.formTitle='新增根文件夹'
      },
      addroot(){
        this.addrootdata.customerId=this.customerid;
        this.addrootdata.name=this.formData.name;
        this.addrootdata.parentId=-1;
        this.submitLoading=true;
        addDirectory(this.addrootdata).then(res=>{

          if (!res.data.code) {
            this.$message({
              message: '添加文件夹成功',
              type: 'success',
            });
            this.getList();
            this.formVisibleroot = false;
            this.formData.parentid='';
            this.formData.name='';
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
          this.submitLoading=false;
        }).catch(error=>{
          console.log(error);
        });
      },
      backfiles(row){
        this.backid=row.id;
        getDocumentChildren(this.backid).then(res=>{
          this.treechildList=res.data.data;
          this.typeselect=res.data.data;
        });
        getDocumentChildrens(this.backid).then(res=>{
          this.treesonList=res.data.data;
        });
        this.resourceCheckedKey=this.backid;
        this.getList();
      },
      addfileinfo(){
        this.formVisiblefileinfo=true;
        this.formTitle='上传文件';
        this.ufile.comment="";
        this.cnum=0;
      },
   /*   fileinfo(){
        updatefile(this.editfileformData).then(res=>{
          if (res.data.code==0) {
            this.getfileList();

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
      },*/
      filedown(node,data){
        this.downfilename=data.name;
        download(data.id).then(res=>{
          this.downaddress=res.data.data;
          const download_link=document.createElement("a");
          download_link.href=this.downaddress;
          download_link.download=data.name;
          let ev=document.createEvent("MouseEvents");
          ev.initMouseEvent(
            "click",true,false,window,0,0,0,0,0,
            false,false,false,false,0,null
          );
          download_link.dispatchEvent(ev);

        });

      },
      fileEdit(node,data){
        this.formTitle = '修改文件名称';
        this.formVisibleeditfile = true;
        this.formData.id=data.id;
        this.formData.name=data.name;
        this.formData.parentid=this.treesonList.parentId;
        this.editfileformData=data;
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
      filemore(node,data){
          this.deletedocumentid=data.id;
          this.preFileInfo=data;
      },
      /*知识点树*/
      renderContent(h, { node, data, store }){
        return (
          <span class="custom-tree-node">
                  <span title={node.label} class="span-ellipsis"> <svg-icon icon-class="p1"/> {node.label}</span>
        <span >
        <el-dropdown trigger="click">
        <el-button class="el-icon-more "  type="text" on-click={ () => this.more(data,node) }></el-button>
        <el-dropdown-menu slot="dropdown" style="margin:-10px;">
          <el-dropdown-item ><el-button  class="el-icon-plus" style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>新建 </el-button>  </el-dropdown-item>
        <el-dropdown-item ><el-button class="el-icon-edit" style="font-size: 12px;color:#8FBC8F" type="text" on-click={ () => this.edit(data,node) }>编辑</el-button></el-dropdown-item>
        <el-dropdown-item ><el-button class="el-icon-delete" style="font-size: 12px;color:#A52A2A" type="text" on-click={ () => this.remove(node,data) }>删除</el-button></el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
         </span>
        </span>);
      },
      renderContent1(h, { node, data, store }){
        return (
          <span class="custom-tree-node">
          <span title={node.label} class="span-ellipsis"> <svg-icon icon-class="p1"/> {node.label}</span>
        </span>);
      },
      handleNodeClick(data){
        this.upshow=true;
        this.ufile.document_tree_id=data.id;
        this.childid=data.id;
        getDocumentChildren(this.childid).then(res=>{
          this.treechildList=res.data.data;
          this.typeselect=res.data.data;
          if(this.treechildList==null)
          {
            this.wanttodeletelength=0;
          }
          else {
            this.wanttodeletelength=this.treechildList.length;
          }
          //this.wanttodeletelength=this.treechildList.length;
        })
      },
      deletehandleNodeClick(data){
        this.upshow=true;
        this.ufile.document_tree_id=data.id;
        this.childid=data.id;
        getDocumentChildren(this.childid).then(res=>{
          this.deletetreechildList=res.data.data;
        })
      },
      beupdatefile(file){
        this.updateData.storageName=this.curstoragename;
      },
      beuploadfile(file){
        this.ufile.token=this.$store.getters.token;
        this.ufile.name=file.name;
        this.ufile.customer_id=this.customerid;
        this.formVisiblefileinfo=true;
      },


      onSuccess: function (response, file) {
        this.$message({
          message: '上传文件成功！',
          type: 'success'
        });
        this.$refs.upload.clearFiles();

      },
      onError: function () {
        this.$message.error('上传文件失败！');
      },
      checkupload(){
        if(this.cnum==1) {
          this.$refs.upload.submit();
          this.formVisiblefileinfo = false;
          this.checknum = this.ufile.document_tree_id;
        }
        else if(this.cnum==0){
          this.$message({
            message: '请上传文件',
            type: 'error'
          });
         // this.formVisiblefileinfo = false;
          this.checknum = this.ufile.document_tree_id;
        }
      },
      fileChange(){
        this.cnum=1;
        getDocumentChildren(this.ufile.document_tree_id).then(res=>{
          this.treechildList=res.data.data;
          this.typeselect=res.data.data;
        })
      },
      cancelup(){
        this.formVisiblefileinfo = false;
        this.$refs.upload.clearFiles();
        this.$message({
          message: '取消上传成功！',
          type: 'error'
        });

      },

      fileupdate( node,data){
        this.curstoragename=data.storageName;
        this.formVisibleupdatefileinfo=true;
        this.updateData.document_tree_id=data.documentTreeId;
        this.updateData.customer_id=data.customerId;
        this.updateData.name=data.name;
        this.updateData.id=data.id;
  },
      handleSucess:function (response,file) {
        this.formVisibleupdatefileinfo=false;
        getDocumentChildren(this.updateData.document_tree_id).then(res=>{
          this.treechildList=res.data.data;
          this.typeselect=res.data.data;

        })
      },
      handleError:function(){
        console.log("文件更新失败");
      },

      deletedo(command){
        if(command=='a') {
          console.log("adads");
          this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteDocument(this.deletedocumentid).then(res=> {
              if(!res.data.code) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });

              }
              getDocumentChildren(this.childid).then(res=>{
                this.treechildList=res.data.data;
                this.typeselect=res.data.data;

              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });


        }
        else if(command==='preFile'){
            let htmlurl;
          this.$nextTick(() => {
            this.$message('正在加载，请稍等');
          });
            preview(this.preFileInfo.id).then(res=>{
              if (!res.data.code) {
                htmlurl=res.data;
                window.open(htmlurl);
              }
            }).catch(error=>{
              console.log(error);
            });
          // this.$router.push({path: '/previewFile', query: {preFileInfo:this.preFileInfo,id:this.customerlist,name:this.name}});
        }
        },
      //增加节点
      add(){
        this.addformData.customerId=this.formData.customerid;
        this.addformData.name=this.formData.name;
        this.addformData.parentId=this.formData.parentid;
        this.submitLoading=true;
        addDirectory(this.addformData).then(res=>{
          console.log(res);
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
              message: res.data.msg,
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
        this.formTitle="删除文件夹";
        this.deletevalue=data.id;
        this.Visibledel=true;
        if(data.children==null)
        {
          this.wantdeletenum=0;
        }
        else{
          this.wantdeletenum=data.children.length;
        }
        if(this.wantdeletenum==0&&this.wanttodeletelength==0)
        {
          this.$confirm('确认删除该文件夹吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteDirectoryById(this.deletevalue).then(res=> {
              if(!res.data.code) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.Visibledel=false;
                this.getList();
                getDocumentChildren(this.deletevalue).then(res=>{
                  this.treechildList=res.data.data;
                })
              }
              else {
                this.$message({
                  type:'error',
                  message:'删除失败'
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
        else {
          this.$confirm('该文件夹下的文件夹或文档会被一并删除,请确认是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteDirectoryById(this.deletevalue).then(res => {
              if (!res.data.code) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.Visibledel = false;
                this.getList();
                getDocumentChildren(this.deletevalue).then(res => {
                  this.treechildList = res.data.data;
                })
              }
              else {
                this.$message({
                  type: 'error',
                  message: '删除失败'
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      deletesub(){
        deleteDirectoryById(this.deletevalue).then(res=> {
          if(!res.data.code) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.Visibledel=false;
            this.getList();
            getDocumentChildren(this.deletevalue).then(res=>{
              this.treechildList=res.data.data;
            })
          }
          else {
            this.$message({
              type:'error',
              message:'删除失败'
            });
          }
        });
      },
      more(node,data){},
    },
    mounted() {
      this.url='/api/documenttree/uploadDocument';
      this.updateUrl='/api/documenttree/updateDocument'
      this.customerlist = this.$route.query.id;
      this.name=this.$route.query.name;
      this.getList();
    },
  }

</script>

<style >

  .bg-purple1 {
    font-size:20px;
    margin-top:2%;
    margin-left:10%;
  }
  .custom-tree-node {
    width:70%;
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
  .el-tree-node:focus > .el-tree-node__content, .el-tree-node__content:hover
  {
    background-color: #E0FFFF;
  }
  .custom-tree-node{
    font-size:20px;
  }  　
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content
  {
    background-color: #E0FFFF;
  }
  .el-upload-list__item-name{
    width:400px;
  }
  .span-ellipsis{
    width:100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
