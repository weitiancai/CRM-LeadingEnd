<template>
    <div :style="styleObject">
        <canvas ref='cvs' style="border: 3px solid  #000;"></canvas>
    </div>
</template>

<script>
    import pdfPlugin from './pdfPlugin.js'
    import FreeTextarea from './FreeTextarea.js'

    export default {
        pdfPlugin,
        FreeTextarea,
        name: "PdfFreeCanvas",
        props: {
            pdfFile: {
                type: [Object, File, String],
                required: true
            },
            styleObject: {
                type: Object,
                default: function () {
                    return {
                        width: '600px',
                        margin: '0 auto'
                    }
                }
            }
        },
        data() {
            return {
                cvs: null
            }
        },
        watch: {
            pdfFile(newValue, oldValue) {
                if (!newValue || newValue === oldValue) {
                    // 新的值为空串,和原来的值相同，不做任何事情
                    return;
                }
                // 否则重新初始化PDF
                // 通过PDF文件初始化 pdfPlugin
                if (typeof newValue === 'string') {
                    pdfPlugin.initPDFJSByBase64(newValue, () => {
                        // PDF初始化成功后回调函数，触发初始化完成事件
                        this.$emit('render-complete');
                    });
                } else if (newValue instanceof File) {
                    pdfPlugin.initPDFJS(newValue, () => {
                        // PDF初始化成功后回调函数，触发初始化完成事件
                        this.$emit('render-complete');
                    });
                }
                FreeTextarea.removeAll();
            },

        },
        mounted() {
            this.cvs = this.$refs.cvs;
            pdfPlugin.initPDFPlugin(this.cvs);
            FreeTextarea.init(this.cvs, 'free');
            FreeTextarea.setDefaultFontSize(8);
        }
    }
</script>

<style scoped>

</style>