<template>
    <div :style="styleObject">
        <canvas ref='cvs' style="border: 3px solid  #000;"></canvas>
    </div>
</template>

<script>
    import pdfPlugin from './pdfPlugin.js'
    import rubberhander from './rubberhander.js'

    /**
     * @author Cliven
     * @since 2018-7-25 09:31:59
     * 事件说明：
     * @img-load-complete  签章图片加载完成事件
     * @render-complete PDF渲染完成事件
     * @positioning-completed 签章图片定位完成事件
     *
     * ps: 在父组件使用该组件时候，首次传值不会触发watch，只有第二次传值才会触发watch
     * 导致无法触发pdf渲染，所以请在完成页面加载之后在给予绑定变量的值
     *
     * @pdfBase64Str BASE64编码PDF字符串
     * @stampImageStr BASE64编码的签章图片字符串
     */
    export default {
        pdfPlugin,
        name: 'PdfStampCanvas',
        props: {
            pdfBase64Str: {
                type: String,
                required: true
            },
            stampImageStr: String,
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
                cvs: null,
                boxParam: null,
            }
        }, computed: {
            /**
             * 坐标转换为以左下角为原点的百分比坐标系
             * @returns {{topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number}}
             */
            box() {
                if (!this.boxParam) return {
                    topLeftX: 0
                    , topLeftY: 0
                    , bottomRightX: 0
                    , bottomRightY: 0
                    , width: 0
                    , height: 0
                    , hasBox: false
                };
                let width = this.cvs.width,
                    height = this.cvs.height;
                let Pw = this.boxParam.width / width
                    , Ph = this.boxParam.height / height;

                let topLeftX = this.boxParam.x / width
                    , topLeftY = 1 - this.boxParam.y / height;

                return {
                    topLeftX: topLeftX * 100
                    , topLeftY: topLeftY * 100
                    , bottomRightX: (topLeftX + Pw) * 100
                    , bottomRightY: (topLeftY - Ph) * 100
                    , width: Pw * 100
                    , height: Ph * 100
                    , hasBox: true
                }
            }
        },
        /**
         * 属性变化监听时更新页面信息
         */
        watch: {
            // PDF 字符串
            pdfBase64Str(newValue, oldValue) {
                if (!newValue || newValue === oldValue) {
                    // 新的值为空串,和原来的值相同，不做任何事情
                    return;
                }
                // 否则重新初始化PDF
                // 通过PDF文件初始化 pdfPlugin
                pdfPlugin.initPDFJSByBase64(newValue, () => {
                    // PDF初始化成功后回调函数，触发初始化完成事件
                    this.$emit('render-complete');
                });
            },
            // 签章图片BASE64字符串
            stampImageStr(newValue, oldValue) {
                // console.log("PDF Canvas stampImageStr change", newValue, oldValue);

                if (!newValue || newValue === oldValue) {
                    // 新的值为空串,和原来的值相同，不做任何事情
                    return;
                }
                let imgSrc = newValue;
                // 图片字符串非标准特殊格式开头，那么需要加上格式
                if (newValue.indexOf('data:image/png;base64,') !== 0) {
                    imgSrc = 'data:image/png;base64,' + imgSrc;
                }
                // 创建签章图片对象
                let image = new Image();
                // 设置图片路径内容
                image.src = imgSrc;
                // 图片加载完成回调函数
                image.onload = () => {
                    // console.log("PDF Canvas stamp loaded...");
                    // 更改签章模式和填充图片，覆盖填充模式
                    rubberhander.resetAreaImg(image, rubberhander.PRO_MODE);
                    // 图片加载完成后触发，完成图片加载事件
                    this.$emit('img-load-complete');
                };
            }
        },
        mounted() {
            // 获取页面上的canvas画布DOM
            this.cvs = this.$refs.cvs;
            // 初始化PDF插件
            pdfPlugin.initPDFPlugin(this.cvs);
            // 初始化截取框
            rubberhander.init(this.cvs, pdfPlugin.reDraw);
            // 设置截取框绘制结束后的回调函数
            rubberhander.setFinishCallback(() => {
                this.boxParam = rubberhander.getBox();
                this.$emit('positioning-completed', this.box);
            });
        }
    }
</script>

<style scoped>

</style>
