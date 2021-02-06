/** @format */
import 'babel-polyfill';
import '@/assets/styles/revise.less';
import 'vant/lib/index.less';

import Vue from 'vue';
import App from './App';

import '@/assets/js/common';
import '@/assets/js/vant';
import '@/assets/images/svg/iconfont';

// 导入插件
import '@/utils/prototype';
import '@/utils/directive';
import '@/utils/filter';
import plugin from '@/plugins';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

Vue.use(plugin);
const FastClick = require('fastclick');
FastClick.attach(document.body);

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
