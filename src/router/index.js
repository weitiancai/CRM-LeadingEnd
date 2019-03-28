import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:Layout,
      redirect:'/home',
      children:[
        {
          path: '/home',
          name:'home',
          component:()=>import('@/views/welcome'),
          meta:{
            title:'首页',
          }
        },{
          path: '/customerDetail',
          name:'customerDetail',
          component:()=>import('@/views/customerDetail'),
          meta:{
            title:'客户详情',
          }
        },{
          path: '/hardware',
          name:'hardware',
          component:()=>import('@/views/hardware'),
          meta:{
            title:'硬件',
          }
        },{
          path: '/software',
          name:'software',
          component:()=>import('@/views/software'),
          meta:{
            title:'软件',
          }
        },{
          path: '/document',
          name:'document',
          component:()=>import('@/views/document'),
          meta:{
            title:'文件',
          }
        },{
          path: '/infoDetail',
          name:'infoDetail',
          component:()=>import('@/views/infoDetail'),
          meta:{
            title:'详细信息',
          }
        },
      ]
    },
  ]
})
