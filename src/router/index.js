import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout/Layout'

Vue.use(Router);
export const constantRouterMap = [
  {path: '/', redirect: '/login', hidden: true},
  {path: '/login', component: () => import('@/views/login'), hidden: true},
];

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap =[
    {
      path: '/CRM',
      component: Layout,
      redirect: '/home',
      name:'CRM',
      meta:{
        roles:['CRM'],
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/welcome'),
          meta: {
            title: '首页',
            roles:['CRM'],
          }
        }, {
          path: '/customerDetail',
          name: 'customerDetail',
          component: () => import('@/views/customerDetail'),
          meta: {
            title: '客户详情',
            roles:['CRM'],
          }
        }, {
          path: '/hardware',
          name: 'hardware',
          component: () => import('@/views/hardware'),
          meta: {
            title: '硬件',
            roles:['CRM'],
          }
        }, {
          path: '/software',
          name: 'software',
          component: () => import('@/views/software'),
          meta: {
            title: '软件',
            roles:['CRM'],
          }
        }, {
          path: '/document',
          name: 'document',
          component: () => import('@/views/document'),
          meta: {
            title: '文件',
            roles:['CRM'],
          }
        }, {
          path: '/infoDetail',
          name: 'infoDetail',
          component: () => import('@/views/infoDetail'),
          meta: {
            title: '详细信息',
            roles:['CRM'],
          }
        },
        {
          path: '/previewFile',
          name: 'previewFile',
          component: () => import('@/views/previewFile'),
          meta: {
            title: '预览文件',
            roles:['CRM'],
          }
        },
      ]
    },
  ];
