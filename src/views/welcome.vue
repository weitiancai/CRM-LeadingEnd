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
          <el-input v-model="three.name" placeholder="请输入客户名"></el-input>
          </el-form-item>
          <el-form-item class="form-item">
          <el-input v-model="three.year" placeholder="请输入上线年份"></el-input>
          </el-form-item>
          <el-form-item class="form-item">
          <el-input v-model="three.monthAndDay" placeholder="请输入具体上线时间"></el-input>
          </el-form-item>
          <el-form-item class="form-item">
          <el-button type="primary" @click="findCustomer" icon="el-icon-search">查找</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>
    <!--主页面-->
    <el-main>
      <el-row v-for="(item,index) in customerList" :id="index" :key="item.id" class="rMain">
        <div class="cIndex">
          <p class="pIndex" style="padding-bottom: 1vh">{{index+1}}</p>
        </div>
        <div class="cMain" @click="goToDetail(index,item)">
          <p><b>{{item.name}}</b></p>
          <span style="color: #99a9bf">{{item.function}}<span style="float: right;color: #99a9bf">{{item.publishDate}}</span></span>
        </div>
      </el-row>
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
            value-format="yyyy-MM-dd">
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
  import {getAll, add,customerList} from '../api/welcome'
  import ElMain from "element-ui/packages/main/src/main";

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
          year:'',
          monthAndDay:'',
        }
      }
    },
    methods: {
      findCustomer(){
        customerList(this.three).then(res => {
          this.listLoading = false;
          this.customerList = res.data.page;
        }).catch((error) => {
          this.listLoading = false;
          if (error) console.log(error);
        });
      },
      changeRules(){
        if(this.isUpLoad===true){
          this.formRules.publishDate[0].required=false;
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
        getAll().then(res => {
          this.listLoading = false;
          this.customerList = res.data.data;
        }).catch((error) => {
          this.listLoading = false;
          if (error) console.log(error);
        });
      }
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

  .cMain :hover{
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
