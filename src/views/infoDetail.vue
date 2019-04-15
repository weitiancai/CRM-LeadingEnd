<template>
  <section>
    <el-main>
      <el-form :model="formData" label-width="80px">
        <el-form-item label="客户名" prop="name">
          <span>{{formData.name}}</span>
        </el-form-item>
        <el-form-item label="产品功能" prop="function">
          <span>{{formData.function}}</span>
        </el-form-item>
        <el-form-item label="上线时间" prop="publishDate">
          <span>{{formData.publishDate}}</span>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <span>{{formData.address}}</span>
        </el-form-item>
        <el-form-item label="经纬度" prop="longitudeLatitude">
          <span>{{formData.longitudeLatitude}}</span>
        </el-form-item>
        <el-form-item label="网址" prop="website">
          <span>{{formData.website}}</span>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <span>{{formData.comment}}</span>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button type="warning" plain @click="modifyIt()">修改</el-button>
      </el-row>
    </el-main>

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
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="经纬度" prop="longitudeLatitude">
          <el-input v-model="formData.longitudeLatitude"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="website">
          <el-input v-model="formData.website"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="formData.comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible = false">取消</el-button>
        <el-button type="primary" @click.native="saveIt('formData')" :loading="submitLoading">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import ElMain from "element-ui/packages/main/src/main";
  import {selectById, update} from '../api/infoDetail'

  export default {
    components: {ElMain},
    name: "info-detail",
    data() {
      return {
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
        formData: {},
        formVisible: false, //界面是否显示
        formTitle: '', //界面标题
        submitLoading: false,
        listLoading: false, //是否显示加载动画
        id: '',
      }
    },
    methods: {
      getInfo() {
        selectById(this.id).then(res => {
          this.listLoading = false;
          this.formData = res.data.data;
        }).catch((error) => {
          this.listLoading = false;
          if (error) console.log(error);
        });
      },
      modifyIt() {
        this.action = 'modify';
        this.formVisible=true;
        this.formTitle="修改客户信息";
      },
      saveIt(formData) {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              update(this.formData).then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '修改失败!',
                    type: 'error'
                  });
                }
                this.formVisible=false;
                this.submitLoading=false;
              }).catch((error) => {
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
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.action = 'watch';
      this.getInfo();
    }
  }
</script>

<style scoped>

</style>
