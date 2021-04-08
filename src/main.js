import Vue from 'vue';
import App from './App';
import store from './store';
// import components from './config/components'

import api from '@/lib/api/plugin';
import boot from './config/boot';

Vue.use(api);
// components.reg();

boot.configVue();
boot.configUtil();

App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
