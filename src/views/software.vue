<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item class="form-item">
          <el-button type="primary" @click="showAdd" icon="el-icon-plus">新增软件</el-button>
        </el-form-item>

        <el-form-item style="float: right;" class="form-item">
          <el-input v-model="findStage" placeholder="请输入期数" style="width:200px" clearable></el-input>
          <el-button type="primary" @click="stageSearch" icon="el-icon-search" style="margin-left: 15px;">查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--主界面-->
    <el-main>
      <el-table :data="softwareList" border style="width: 100%;font-size:15px">
        <el-table-column header-align="center" align="center" type="index" width="50" ></el-table-column>
        <el-table-column header-align="center" align="center" label="软件类型" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.type|typeChange}}</span>
          </template></el-table-column>
        <el-table-column header-align="center" align="center" label="厂商" min-width="100" prop="company"></el-table-column>
        <el-table-column header-align="center" align="center" label="名称" min-width="100" prop="name"></el-table-column>
        <el-table-column header-align="center" align="center" label="版本号" min-width="100" prop="version"></el-table-column>
        <el-table-column header-align="center" align="center" label="软件配置" min-width="100" prop="config"></el-table-column>
        <el-table-column header-align="center" align="center" label="状态" min-width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-text="有效"
              inactive-text="无效"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value=1
              :inactive-value=0
              @change="changeStatus(scope.row.id)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="部署日期" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.deployDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="期数" min-width="100" prop="stage"></el-table-column>
        <el-table-column header-align="center" align="center" label="备注" min-width="100" prop="comment"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="modifyIt(scope.row)" type="text">编辑</el-button>
            <el-button size="small" @click="deleteItem(scope.row.id)" type="text">删除</el-button>
            <el-button size="small" @click="showHardware(scope.row.hardwareId)" type="text" v-show="scope.row.hardwareId!=0">硬件详情</el-button>
            <el-button size="small" type="text" v-show="scope.row.hardwareId==0">在多台硬件中飘移</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="pageSizes"
                       :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
    </el-main>

    <!--添加软件-->
    <el-dialog :title="formTitle" :visible.sync="formVisible" :close-on-click-modal="false">
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="软件类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择硬件类型">
            <el-option label="操作系统" :value=1></el-option>
            <el-option label="数据库" :value=2></el-option>
            <el-option label="web服务器" :value=3></el-option>
            <el-option label="其他" :value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="厂商" prop="company">
          <el-input v-model="formData.company"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="formData.version"></el-input>
        </el-form-item>
        <el-form-item label="软件配置" prop="config">
          <el-input v-model="formData.config"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="有效" :value=1></el-option>
            <el-option label="无效" :value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部署日期" prop="deployDate">
          <el-date-picker
            v-model="formData.deployDate"
            type="datetime"
            placeholder="请选择部署日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期数" prop="stage">
          <el-input v-model.number="formData.stage"></el-input>
        </el-form-item>
        <el-form-item label="挂载硬件" prop="hardwareId">
          <el-button type="primary" size="small" @click="chooseHardware">选择硬件</el-button>
          <el-radio v-model="formData.hardwareId" :label="0">在多台中飘移</el-radio>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="formData.comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible = false">取消</el-button>
        <el-button type="primary" @click.native="saveSubmit" :loading="submitLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--选择硬件-->
    <el-dialog :title="formTitleHard" :visible.sync="formVisibleHard" :close-on-click-modal="false">
      <el-table ref="singleTable"  @current-change="chooseOne" :data="hardwareList" border highlight-current-row style="width: 100%;font-size:15px">
        <el-table-column header-align="center" align="center" type="index" width="50" ></el-table-column>
        <el-table-column header-align="center" align="center" label="硬件类型" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.type|typeChange2}}</span>
          </template></el-table-column>
        <el-table-column header-align="center" align="center" label="厂商" min-width="100" prop="company"></el-table-column>
        <el-table-column header-align="center" align="center" label="品牌" min-width="100" prop="brand"></el-table-column>
        <el-table-column header-align="center" align="center" label="期数" min-width="100" prop="stage"></el-table-column>
        <el-table-column header-align="center" align="center" label="备注" min-width="100" prop="comment"></el-table-column>
      </el-table>
      <el-col style="width:100%">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange2"
                       @current-change="handleCurrentChange2"
                       :page-sizes="pageSizes2"
                       :page-size="pageSize2" :total="total2" style="float:right;">
        </el-pagination>
      </el-col>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisibleHard = false">取消</el-button>
      </div>
    </el-dialog>

    <!--硬件详情-->
    <el-dialog :title="formTitleShowHardware" :visible.sync="formVisibleShowHardware" :close-on-click-modal="false">
      <el-form :model="formDataHardWare" label-width="80px" ref="formDataHardWare">
        <el-form-item label="硬件类型" prop="type">
          <el-select v-model="formDataHardWare.type" :readonly="true">
            <el-option label="服务器" :value=1></el-option>
            <el-option label="密码卡" :value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="厂商" prop="company" >
          <el-input v-model="formDataHardWare.company" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand" >
          <el-input v-model="formDataHardWare.brand" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="formDataHardWare.model" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="序列号" prop="sn">
          <el-input v-model="formDataHardWare.sn" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="硬件配置" prop="config">
          <el-input v-model="formDataHardWare.config" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formDataHardWare.status" :readonly="true">
            <el-option label="有效" :value=1></el-option>
            <el-option label="无效" :value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部署日期" prop="deployDate">
          <el-date-picker
            v-model="formDataHardWare.deployDate"
            type="datetime"
            :readonly="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期数" prop="stage">
          <el-input v-model.number="formDataHardWare.stage" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="formDataHardWare.comment" :readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisibleShowHardware = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import ElMain from "element-ui/packages/main/src/main";
  import {softwarePage,add,changeValid,update,hardwarePage,selectById,deleteIt} from '../api/software'
    export default {
      components: {ElMain},
      name: "software",
      data(){
        return{
          softwareId:'',
          findStage:'',
          id:'',
          softwareList:[],
          hardwareList:[],
          submitLoading:false,
          listLoading: false, //是否显示加载动画

          total: 0,
          pageIndex: 1, //页码
          pageSize: this.CONSTANT.PAGE_SIZE, //分页大小
          pageSizes: this.CONSTANT.PAGE_SIZES, //分页大小选择列表

          total2: 0,
          pageIndex2: 1, //页码
          pageSize2: this.CONSTANT.PAGE_SIZE, //分页大小
          pageSizes2: this.CONSTANT.PAGE_SIZES, //分页大小选择列表

          formTitleHard:'选择硬件',
          formVisibleHard:false,

          formTitleShowHardware:'挂载硬件详情',
          formVisibleShowHardware:false,

          formVisible: false, //界面是否显示
          formTitle: '', //界面标题
          formRules: {
            type: [
              {required: true, message: '请选择软件类型', trigger: 'blur'}
            ],
            company: [
              {required: true, message: '请输入厂商', trigger: 'blur'}
            ],
            name:[
              {required:true,message:"请输入名称",trigger:'blur'}
            ],
            version:[
              {required:true,message:"请输入版本号",trigger:'blur'}
            ],
            config:[
              {required:true,message:"请输入软件配置",trigger:'blur'}
            ],
            status:[
              {required:true,message:"请选择状态",trigger:'blur'}
            ],
            deployDate:[
              {required:true,message:"请输入部署日期",trigger:'blur'}
            ],
            stage:[
              {required:true,message:"请输入期数",trigger:'blur'},
              {type: 'number',message:"请输入数字",trigger:'blur'}
            ],
            hardwareId:[
              {required:true,message:"请选择相关硬件",trigger:'blur'}
            ]
          },
          formData:{
            type:'',
            company:'',
            name:'',
            version:'',
            config:'',
            status:'',
            deployDate:'',
            stage:undefined,
            comment:'',
            customerId:'',
            hardwareId:'',
          },
          formDataHardWare:{},

          action:'',//add 新增;modify 编辑
        }
      },
      methods:{
        deleteItem(id){
          this.$confirm('确认删除该记录吗?', '提示', {
            type: 'warning'
          }).then(() => {
            deleteIt(id).then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '删除失败',
                  type: 'error'
                });
              }
              this.getList();
            });
          }).catch(() => {
            if (error) console.log(error);
          });
        },
        chooseOne(val) {
          this.$confirm('确认选择吗？', '提示', {}).then(() => {
            this.formData.hardwareId = val.id;
            this.formVisibleHard=false;
          })
        },
        showHardware(id){
          selectById(id).then(res => {
            if (res.data.code == 0) {
             this.formDataHardWare=res.data.data;
             this.formVisibleShowHardware=true;
            }
          }).catch((error) => {
            if (error) console.log(error);
          });
        },
        getHardwareList(){
          const params = new FormData;
          params.append('page',this.pageIndex2);
          params.append('limit',this.pageSize2);
          params.append('customer_id',this.id);
          params.append('keyword',"");
          hardwarePage(params).then(res => {
            this.total2 = res.data.page.totalCount;
            this.hardwareList=res.data.page.list;
          }).catch((error) => {
            if (error) console.log(error);
          });
        },
        chooseHardware(){
          this.formVisibleHard=true;
          this.getHardwareList();
        },
        saveSubmit(){
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.submitLoading = true;
            if(this.action=='add'){
              let software={
                type:this.formData.type,
                company:this.formData.company,
                name:this.formData.name,
                version:this.formData.version,
                config:this.formData.config,
                status:this.formData.status,
                deployDate:this.formData.deployDate,
                stage:this.formData.stage,
                comment:this.formData.comment,
                customerId:this.id,
                hardwareId:this.formData.hardwareId,
              };
              add(software).then(res => {
                this.submitLoading = false;
                if (res.data.code == 0) {
                  this.formVisible = false;
                  this.getList(); //重新加载数据
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '添加失败！',
                    type: 'error'
                  });
                }
              }).catch((error) => {
                this.submitLoading = false;
                if (error) console.log(error);
              });
            }else{
              let software={
                type:this.formData.type,
                company:this.formData.company,
                name:this.formData.name,
                version:this.formData.version,
                config:this.formData.config,
                status:this.formData.status,
                deployDate:this.formData.deployDate,
                stage:this.formData.stage,
                comment:this.formData.comment,
                customerId:this.id,
                hardwareId:this.formData.hardwareId,
                id:this.softwareId,
              };
              update(software).then(res => {
                this.submitLoading = false;
                if (res.data.code == 0) {
                  this.formVisible = false;
                  this.getList(); //重新加载数据
                  this.$message({
                    message: '编辑成功！',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '编辑失败！',
                    type: 'error'
                  });
                }
              }).catch((error) => {
                this.submitLoading = false;
                if (error) console.log(error);
              });
            }
          });
        },
        modifyIt(item){
          this.formVisible=true;
          this.formTitle='编辑软件';
          this.action='modify';
          this.formData={
              type:item.type,
              company:item.type,
              name:item.name,
              version:item.version,
              config:item.config,
              status:item.status,
              deployDate:item.deployDate,
              stage:item.stage,
              comment:item.comment,
              customerId:item.customerId,
              hardwareId:item.hardwareId,
          },
          this.softwareId=item.id;
        },
        changeStatus(id){
          changeValid(id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
            } else {
              this.$message({
                message: '修改失败！',
                type: 'error'
              });
            }
          }).catch((error) => {
            if (error) console.log(error);
          });
        },
        showAdd(){
          this.formVisible=true;
          this.formTitle='新增软件';
          this.action='add';
          this.formData={
            type:'',
              company:'',
              name:'',
              version:'',
              config:'',
              status:'',
              deployDate:'',
              stage:undefined,
              comment:'',
              customerId:'',
              hardwareId:'',
          };
        },
        stageSearch(){
          this.getList();
        },
        getList(){
          this.listLoading = true;
          const params = new FormData;
          params.append('page',this.pageIndex);
          params.append('limit',this.pageSize);
          params.append('customer_id',this.id);
          params.append('keyword',this.findStage);
          softwarePage(params).then(res => {
            this.listLoading = false;
            this.total = res.data.page.totalCount;
            this.softwareList=res.data.page.list;
          }).catch((error) => {
            this.listLoading = false;
            if (error) console.log(error);
          });
        },
        //分页
        handleSizeChange(val) { //改变分页大小
          this.pageSize = val;
          this.getList();
        },
        handleCurrentChange(val) { //页码跳转
          this.pageIndex = val;
          this.getList();
        },
        //分页2
        handleSizeChange2(val) { //改变分页大小
          this.pageSize2 = val;
          this.getHardwareList();
        },
        handleCurrentChange2(val) { //页码跳转
          this.pageIndex2 = val;
          this.getHardwareList();
        },
      },
      created(){
        this.id=this.$route.query.id;
        this.formData.customerId=this.id;
        this.getList();
      },
      filters: {
        typeChange(type) {
          const typeMap = {
            1: '操作系统',
            2: '数据库',
            3: 'web服务器',
            0: '其他',
          }
          return typeMap[type]
        },
        typeChange2(type) {
          const typeMap = {
            1: '服务器',
            2: '密码卡',
          }
          return typeMap[type]
        },
      }
    }
</script>

<style scoped>
  .toolbar{
    background: #f2f2f2;
    padding:10px;
  }
  .form-item{
    margin-bottom: 0px!important;
  }
</style>
