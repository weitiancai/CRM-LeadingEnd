<template>
    <IEcharts
            v-if="bar!=null"
            :option="bar"
            :loading="loading"
            style="height: 600px;"
            @ready="onReady"
            @click="onClick"
    />
</template>

<script>
    import {getKpointTree} from "../../api/courseDetail";
    import IEcharts from 'vue-echarts-v3/src/full.js';
    export default {
        name: "echarts",
        data(){
            return{
                loading: false,
                courseid:'',
                courseName:'',
                dataList:[{
                    name:'',
                    children:[],
                }
                ],
                bar: null,
            }
        },
        components: {
            IEcharts
        },
        methods:{
            setBar(){
                this.bar={
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [{
                        type: 'tree',
                        data: this.dataList,
                        left: '2%',
                        right: '2%',
                        top: '8%',
                        bottom: '20%',
                        symbol: 'emptyCircle',
                        symbolSize:10,
                        orient: 'vertical',
                        label: {
                            normal: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 15
                            }
                        },

                        leaves: {
                            label: {
                                normal: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            }
                        },
                        expandAndCollapse: true,
                        animationDurationUpdate: 550
                    }]
                }
            },
            getList(){
                //this.loading = !this.loading;
                getKpointTree(this.courseid).then(res=>{
                    this.dataList[0].children=res.data.data;
                    this.dataList[0].name=this.courseName;
                    //this.bar.series.data[0].name='Python';
                    //console.log(this.dataList);
                    this.setBar();
                }).catch(error => {
                    console.log(error);
                })
            },
            onReady(instance, ECharts) {
            },
            onClick(event, instance, ECharts) {
            }
        },
        created(){
            this.courseid = this.$route.query.courseid;
            this.courseName = this.$route.query.coursename;
            this.getList();
        }
    }
</script>

<style scoped>
    .echarts {
        width: 400px;
        height: 800px;
    }
</style>