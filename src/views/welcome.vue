<template>
  <section>
    <!--工具栏-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item class="form-item">
          <el-button type="primary" @click="showAdd" icon="el-icon-plus">新增客户</el-button>
        </el-form-item>

        <div style="float: right">
          <el-form-item class="form-item">
          <el-input v-model="three.name" placeholder="请输入客户名" style="width: 14vw"></el-input>
          </el-form-item>
          <el-form-item class="form-item">
            <el-date-picker
              v-model="three.startYear"
              type="year"
              style="width: 14vw"
              placeholder="上限年份/单个年份">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="three.endYear"
              type="year"
              style="width: 10vw"
              placeholder="下限年份">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="form-item">
          <el-button type="primary" @click="findCustomer" icon="el-icon-search">筛选</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>
    <!--主页面-->
    <el-main style="padding-top: 0px">
      <el-row v-for="(item,index) in customerList" :id="index" :key="item.id" class="rMain">
        <div class="cIndex">
          <p class="pIndex" style="padding-bottom: 1vh">{{index+1}}</p>
        </div>
        <div class="cMain" @click="goToDetail(index,item)">
          <div class="cMain-list">
          <p><b>{{item.name}}</b></p>
          <span style="color: #99a9bf">{{item.function}}<span style="float: right;color: #99a9bf">{{item.publishDate}}</span></span>
          </div>
        </div>
      </el-row>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="pageSizes"
                       :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
    </el-main>
    <!--添加客户-->
    <el-dialog :title="formTitle" :visible.sync="formVisible" :close-on-click-modal="false">
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="客户名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="产品功能" prop="function">
          <el-input v-model="formData.function"></el-input>
        </el-form-item>
        <el-form-item label="上线时间" prop="publishDate">
          <el-date-picker
            v-model="formData.publishDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="changeIsUpLoad">
          </el-date-picker>
          <el-checkbox v-model="isUpLoad" @change="changeRules">未上线</el-checkbox>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="website">
          <el-input v-model="formData.website"></el-input>
        </el-form-item>
        <el-form-item label="经纬度" prop="longitudeLatitude">
          <el-input v-model="formData.longitudeLatitude"></el-input>
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
  import {getAll, add,customerPage} from '../api/welcome'
  import ElMain from "element-ui/packages/main/src/main"

  export default {
    name: "welcome",
    components: {ElMain},
    data() {
      return {
        customerList: [],
        listLoading: false, //是否显示加载动画
        submitLoading: false,



        formVisible: false, //界面是否显示
        formTitle: '', //界面标题
        formRules: {
          name: [
            {required: true, message: '请输入客户名', trigger: 'blur'}
          ],
          function: [
            {required: true, message: '请输入产品功能', trigger: 'blur'}
          ],
          publishDate: [
            {required: true, message: "请输入上线时间", trigger: 'blur'}
          ],
          address: [
            {required: true, message: "请输入地址", trigger: 'blur'}
          ],
        },
        isUpLoad:false,//是否上线
        formData: {
          name: '',
          function: '',
          publishDate: '',
          longitudeLatitude: '',
          website: '',
          address: '',
          comment: '',
          managerId: -1,
        },

        //查找客户
        three:{
          name:'',
          startYear: '',
          endYear: '',
        },


        //分页数据
        total: 0,
        pageIndex: 1, //页码
        pageSize: this.CONSTANT.PAGE_SIZE, //分页大小
        pageSizes: this.CONSTANT.PAGE_SIZES, //分页大小选择列表
      }
    },
    methods: {
      changeIsUpLoad(){
        this.formRules.publishDate[0].required=true;
        this.isUpLoad=false;
      },
      findCustomer(){
        this.getList();
      },
      changeRules(){
        if(this.isUpLoad===true){
          this.formRules.publishDate[0].required=false;
          this.formData.publishDate='';
        }else{
          this.formRules.publishDate[0].required=true;
        }
      },
      showAdd() {
        this.formVisible = true;
        this.formTitle = '新增客户';
        this.formData = {
          name: '',
          function: '',
          publishDate: '',
          longitudeLatitude: '',
          website: '',
          address: '',
          comment: '',
          managerId: -1,
        };
        this.isUpLoad=false;
      },
      goToDetail(index, item) {
        this.$router.push({path: '/customerDetail', query: {id: item.id, name: item.name}});
      },
      saveSubmit(formData) {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.submitLoading = true;
              let customer = {
                name: this.formData.name,
                function: this.formData.function,
                publishDate: this.formData.publishDate,
                longitudeLatitude: this.formData.longitudeLatitude,
                website: this.formData.website,
                address: this.formData.address,
                comment: this.formData.comment,
                managerId: -1,
              };
              if(this.isUpLoad===true){
                customer.publishDate='未上线';
              }
              add(customer).then(res => {
                this.submitLoading = false;
                if (res.data.code == 0) {
                  this.formVisible = false;
                  this.getList();   //重新加载数据
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
                this.$refs['formData'].resetFields();
              }).catch((error) => {
                this.submitLoading = false;
                if (error) console.log(error);
              });
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
      getList() {
        this.listLoading = true;
        const params = new FormData;
        params.append('page', this.pageIndex);
        params.append('limit', this.pageSize);
        params.append('name',this.three.name);
        params.append('startYear',this.three.startYear);
        params.append('endYear',this.three.endYear);
        customerPage(params).then(res => {
          this.listLoading = false;
          this.total = res.data.page.totalCount;
          this.customerList = res.data.page.list;
        }).catch((error) => {
          this.listLoading = false;
          if (error) console.log(error);
        });
      },
      //分页函数
      handleSizeChange(val) { //改变分页大小
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) { //页码跳转
        this.pageIndex = val;
        this.getList();
      },
    },
    mounted() {
      this.getList();
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    },

  }
</script>

<style scoped>
  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
  }

  .form-item {
    margin-bottom: 0px !important;
  }

  .cIndex {
    width: 3vw;
    background-color: #a7ede2;
    margin-right: 2vh;
    float: left;
  }

  .cMain {
    background-color: #a7ede2;
    width: 80vw;
    float: left;
  }
  .cMain-list{
    margin: 1vh 1vw;
  }

  .cMain:hover{
    cursor:pointer;
  }

  .rMain {
    margin-top: 1vh;
  }

  .pIndex {
    text-align: center;
    margin-top: 1.5vh;
  }

  p {
    font-size: large;
  }


</style>
