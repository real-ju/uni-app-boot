import Vue from 'vue';
import App from './App';
import store from './store';
// import components from './config/components'

import api from '@/lib/api/plugin';
import boot from './config/boot';
import uView from 'uview-ui';

Vue.use(api);
Vue.use(uView);
// components.reg();

boot.configVue();
boot.configUtil();

App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
