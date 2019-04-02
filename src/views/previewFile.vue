<template>
  <div class="app-container">
    <sticky :className="'sub-navbar'">
      <el-button type="primary" icon="el-icon-arrow-left" size="mini" round
                 @click.prevent="prevPage">前一页
      </el-button>
      <span><strong>{{this.page}}</strong>/<strong>{{this.total}}</strong></span>
      <el-button type="primary" size="mini" round
                 @click.prevent="nextPage">后一页<i
        class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
      <el-inputNumber size="mini" v-model="page" :min="1" :max="total"></el-inputNumber>
      <el-button icon="el-icon-refresh" size="mini" type="primary"
                 @click="jumpPage">
        跳转
      </el-button>
      <el-button type="primary" icon="el-icon-minus" size="mini" @click="downSize">缩小
      </el-button>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="upSize">放大</el-button>
      <goback></goback>
    </sticky>
    <pdf-rubber-canvas v-bind:pdfBase64Str="pdfBase64Str" v-loading="pdfLoading" v-bind:styleObject="styleObject"
                       v-on:render-complete="renderComplete">
    </pdf-rubber-canvas>
  </div>
</template>

<script>
  // 导入组件
  import PdfRubberCanvas from '@/components/pdfCanvas/PdfRubberCanvas.vue'
  import Sticky from '@/components/Sticky'
  import {preview} from '../api/previewFile'
  import Goback from '@/components/Goback'

    export default {
        name: "preview-file",
      components: {
        PdfRubberCanvas,
        Sticky,
        Goback
      },
      data() {
        return {
          pdfBase64Str: '',
          pdfPlugin: null,
          fileId: '',
          page: 1,
          total: 0,
          pdfLoading: false,
          styleObject: {
            width: '600px',
            margin: '0 auto'
          },
          currentScale: 1.0,

        }
      },
      methods: {
        getPdfBase64Str() {
          this.pdfLoading = true;
          preview(this.fileId).then(response => {
            this.pdfBase64Str = response.data.data;
            this.pdfLoading = false;
          }).catch(error => {
            console.error(error);
          })
        },
        renderComplete() {
          this.total = this.pdfPlugin.getPageTotal();
          this.pdfPlugin.setScale(this.currentScale);
        },

        prevPage() {
          this.pdfPlugin.previous();
          if (this.pdfPlugin.getCurrentPage() === 1) {
            this.$message({
              message: "已经是第一页",
              type: 'warning',
              showClose: true,
              duration: 1500,
            });
          }
          this.page = this.pdfPlugin.getCurrentPage();
        },
        nextPage() {
          this.pdfPlugin.next();
          if (this.pdfPlugin.getCurrentPage() === this.pdfPlugin.getPageTotal()) {
            this.$message({
              message: "已经是最后页",
              type: 'warning',
              showClose: true,
              duration: 1500,
            });
          }
          this.page = this.pdfPlugin.getCurrentPage();
        },
        jumpPage() {
          this.pdfPlugin.pageTo(this.page);
          if (this.page < 1 || this.page > this.pdfPlugin.getPageTotal()) {
            this.$message({
              message: "页面非法",
              type: 'error',
            });
          }
          this.page = this.pdfPlugin.getCurrentPage();
        },

        downSize() {
          if (this.currentScale === 1.0) {
            this.$message.warning('已经是原始大小。（100%）');
            return;
          }
          this.currentScale = 1.0;
          this.changeSize();
        },
        upSize() {
          if (this.currentScale === 2.0) {
            this.$message.warning('已经是最大倍数。（200%）');
            return;
          }
          this.currentScale = 2.0;
          this.changeSize();
        },
        changeSize() {
          this.total = this.pdfPlugin.getPageTotal();
          const thiz = this;
          this.pdfPlugin.setScale(this.currentScale, function () {
            const canvas = thiz.pdfPlugin.getCanvas();
            thiz.styleObject = {
              width: `${canvas.width}px`,
              margin: '0 auto'
            };
          });
        },
      },
      created() {
        this.pdfPlugin = PdfRubberCanvas.pdfPlugin;
        this.fileId = this.$route.query.id;
        this.getPdfBase64Str();
      }
    }
</script>

<style scoped>

</style>
