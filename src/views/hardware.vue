<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item class="form-item">
          <el-button type="primary" @click="showAdd" icon="el-icon-plus">新增硬件</el-button>
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
      <el-table :data="hardwareList" border style="width: 100%;font-size:15px">
        <el-table-column header-align="center" align="center" type="index" width="50"></el-table-column>
        <el-table-column header-align="center" align="center" label="硬件类型" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.type|typeChange}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="厂商" min-width="100"
                         prop="company"></el-table-column>
        <el-table-column header-align="center" align="center" label="品牌" min-width="100" prop="brand"></el-table-column>
        <el-table-column header-align="center" align="center" label="型号" min-width="100" prop="model"></el-table-column>
        <el-table-column header-align="center" align="center" label="序列号" min-width="100" prop="sn"></el-table-column>
        <el-table-column header-align="center" align="center" label="硬件配置" min-width="100"
                         prop="config"></el-table-column>
        <el-table-column header-align="center" align="center" label="状态" min-width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-text="有效"
              inactive-text="无效"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="changeStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="部署日期" min-width="100" prop="deployDate"></el-table-column>
        <el-table-column header-align="center" align="center" label="期数" min-width="100" prop="stage"></el-table-column>
        <el-table-column header-align="center" align="center" label="备注" min-width="100"
                         prop="comment"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="modifyIt(scope.row)" type="text">编辑</el-button>
            <el-button size="small" @click="deleteItem(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

<<<<<<< HEAD
      <!--工具条-->
=======
      <!--工具条:分页-->
>>>>>>> 062e872014baad1088c6de7f28c747979cee1545
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="pageSizes"
                       :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
    </el-main>

    <!--添加硬件-->
<<<<<<< HEAD
    <el-dialog :title="formTitle" :visible.sync="formVisible" :close-on-click-modal="false">
=======
    <el-dialog :title="formTitle" :visible.sync="formVisible" :close-on-click-modal="false"  style="margin-top: -8vh">
>>>>>>> 062e872014baad1088c6de7f28c747979cee1545
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="硬件类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择硬件类型">
            <el-option label="服务器" :value="1"></el-option>
            <el-option label="密码卡" :value="2"></el-option>
            <el-option label="交换机" :value="3"></el-option>
            <el-option label="网关" :value="4"></el-option>
            <el-option label="硬件令牌" :value="5"></el-option>
            <el-option label="USBKey" :value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="厂商" prop="company">
          <el-input v-model="formData.company"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="formData.brand"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="formData.model"></el-input>
        </el-form-item>
        <el-form-item label="序列号" prop="sn">
          <el-input v-model="formData.sn"></el-input>
        </el-form-item>
        <el-form-item label="硬件配置" prop="config">
          <el-input v-model="formData.config"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="有效" :value=1 ></el-option>
            <el-option label="无效" :value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部署日期" prop="deployDate">
          <el-date-picker
            v-model="formData.deployDate"
            type="date"
            placeholder="请选择部署日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期数" prop="stage">
          <el-input v-model.number="formData.stage"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="formData.comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible = false">取消</el-button>
        <el-button type="primary" @click.native="saveSubmit('formData')" :loading="submitLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import ElMain from "element-ui/packages/main/src/main";
  import {hardwarePage, add, changeValid, update, deleteIt} from '../api/hardware'

  export default {
    components: {ElMain},
    name: "hardware",
    data() {
      return {
        hardwareId: '',
        findStage: '',
        id: '',
        hardwareList: [],
        submitLoading: false,
        listLoading: false, //是否显示加载动画

<<<<<<< HEAD
=======
        //分页数据
>>>>>>> 062e872014baad1088c6de7f28c747979cee1545
        total: 0,
        pageIndex: 1, //页码
        pageSize: this.CONSTANT.PAGE_SIZE, //分页大小
        pageSizes: this.CONSTANT.PAGE_SIZES, //分页大小选择列表

        formVisible: false, //界面是否显示
        formTitle: '', //界面标题
        formRules: {
          type: [
            {required: true, message: '请选择硬件类型', trigger: 'blur'}
          ],
          company: [
            {required: true, message: '请输入厂商', trigger: 'blur'}
          ],
          brand: [
            {required: true, message: "请输入品牌", trigger: 'blur'}
          ],
          model: [
            {required: true, message: "请输入型号", trigger: 'blur'}
          ],
          sn: [
            {required: true, message: "请输入序列号", trigger: 'blur'}
          ],
          config: [
            {required: true, message: "请输入硬件配置", trigger: 'blur'}
          ],
          status: [
            {required: true, message: "请选择状态", trigger: 'blur'}
          ],
          deployDate: [
            {required: true, message: "请输入部署日期", trigger: 'blur'}
          ],
          stage: [
            {required: true, message: "请输入期数", trigger: 'blur'},
            {type: 'number', message: "请输入数字", trigger: 'blur'}
          ],
        },
        formData: {
          type: '',
          company: '',
          brand: '',
          model: '',
          sn: '',
          config: '',
          status: 1,
          deployDate: '',
          stage: undefined,
          comment: '',
          customerId: '',
        },

        action: '',//add 新增;modify 编辑
      }
    },
    methods: {
      deleteItem(id) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          deleteIt(id).then((res) => {
            if (res.data.code == 0) {
              if (res.data.data == 1) {
                this.$message({
                  message: '存在挂载软件不可删除',
                  type: 'error'
                });
              } else {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
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
      modifyIt(item) {
        this.formVisible = true;
        this.formTitle = '编辑硬件';
        this.action = 'modify';
        this.formData = {
          type: item.type,
          company: item.company,
          brand: item.brand,
          model: item.model,
          sn: item.sn,
          config: item.config,
          status: item.status,
          deployDate: item.deployDate,
          stage: item.stage,
          comment: item.comment,
          customerId: this.id,
        };
        this.hardwareId = item.id;
      },
      changeStatus(item) {
        this.$confirm('是否修改该硬件状态？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        changeValid(item.id).then(res => {
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
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消修改'
          });
          if(item.status===0){
            item.status=1;
          }else{
            item.status=0;
          }
        });
      },
      saveSubmit(formData) {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.submitLoading = true;
              if (this.action == 'add') {
                let hardware = {
                  type: this.formData.type,
                  company: this.formData.company,
                  brand: this.formData.brand,
                  model: this.formData.model,
                  sn: this.formData.sn,
                  config: this.formData.config,
                  status: this.formData.status,
                  deployDate: this.formData.deployDate,
                  stage: this.formData.stage,
                  comment: this.formData.comment,
                  customerId: this.id,
                };
                add(hardware).then(res => {
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
              } else {
                let hardware = {
                  type: this.formData.type,
                  company: this.formData.company,
                  brand: this.formData.brand,
                  model: this.formData.model,
                  sn: this.formData.sn,
                  config: this.formData.config,
                  status: this.formData.status,
                  deployDate: this.formData.deployDate,
                  stage: this.formData.stage,
                  comment: this.formData.comment,
                  customerId: this.id,
                  id: this.hardwareId,
                };
                update(hardware).then(res => {
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
          } else {
            this.$message({
              message: '信息未填写完整！',
              type: 'error'
            });
            return false;
          }
        });
      },
      showAdd() {
        this.formVisible = true;
        this.formTitle = '新增硬件';
        this.action = 'add';
        this.formData = {
          type: '',
          company: '',
          brand: '',
          model: '',
          sn: '',
          config: '',
          status: 1,
          deployDate: '',
          stage: undefined,
          comment: '',
          customerId: this.id,
        };
      },
      stageSearch() {
        this.getList();
      },
      getList() {
        this.listLoading = true;
        const params = new FormData;
        params.append('page', this.pageIndex);
        params.append('limit', this.pageSize);
        params.append('customer_id', this.id);
        params.append('keyword', this.findStage);
        hardwarePage(params).then(res => {
          this.listLoading = false;
          this.total = res.data.page.totalCount;
          this.hardwareList = res.data.page.list;
        }).catch((error) => {
          this.listLoading = false;
          if (error) console.log(error);
        });
      },
<<<<<<< HEAD
      //分页
=======
      //分页函数
>>>>>>> 062e872014baad1088c6de7f28c747979cee1545
      handleSizeChange(val) { //改变分页大小
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) { //页码跳转
        this.pageIndex = val;
        this.getList();
      },
    },
    created() {
      this.id = this.$route.query.id;
      this.formData.customerId = this.id;
      this.getList();
    },
    filters: {
      typeChange(type) {
        const typeMap = {
          1: '服务器',
          2: '密码卡',
          3:'交换机',
          4:'网关',
          5:'硬件令牌',
          6:'USBKey'
        }
        return typeMap[type]
      },
    }
  }
</script>

<style scoped>
  .toolbar {
    background: #f2f2f2;
    padding: 10px;
  }

  .form-item {
    margin-bottom: 0px !important;
  }
</style>
