// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Layout from './components/Layout/Layout'

import iView from 'iview';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css';

import '@/icons' // icon
import '@/styles/index.scss'
import _CONSTANT from './utils/constant'
import * as filters from './filters' // global filters

Vue.prototype.CONSTANT = _CONSTANT

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(ElementUI);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {Layout},
  template: '<Layout/>',
  render: h => h(App)
})
