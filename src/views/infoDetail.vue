<template>
  <section>
    <el-main>
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="客户名" prop="name">
          <el-input v-model="formData.name" :readonly="action=='watch'"></el-input>
        </el-form-item>
        <el-form-item label="产品功能" prop="function">
          <el-input v-model="formData.function" :readonly="action=='watch'"></el-input>
        </el-form-item>
        <el-form-item label="上线时间" prop="publishDate">
          <el-date-picker
            v-model="formData.publishDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :readonly="action=='watch'">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address" :readonly="action=='watch'"></el-input>
        </el-form-item>
        <el-form-item label="经纬度" prop="longitudeLatitude">
          <el-input v-model="formData.longitudeLatitude" :readonly="action=='watch'"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="website">
          <el-input v-model="formData.website" :readonly="action=='watch'"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input v-model="formData.comment" :readonly="action=='watch'"></el-input>
        </el-form-item>
      </el-form>
      <el-row style="float: right">
        <el-button type="warning" plain @click="modifyIt()">修改</el-button>
        <el-button type="success" plain @click="saveIt()" v-if="action=='modify'">确定</el-button>
        <el-button type="primary" plain @click="cancel()" v-if="action=='modify'">取消</el-button>
      </el-row>
    </el-main>
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
        action: '',//watch只看,modify修改
        id: '',
      }
    },
    methods: {
      cancel() {
        this.action = 'watch';
        this.getInfo();
      },
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
      },
      saveIt() {
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
            this.action = 'watch';
          }).catch((error) => {
            if (error) console.log(error);
          });
        })
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
