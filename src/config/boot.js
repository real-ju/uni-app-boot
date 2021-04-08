import Vue from 'vue';

import util from '../lib/util';

/**
 * 配置Vue
 */
function configVue() {
  if (process.env.NODE_ENV === 'production') {
    Vue.config.silent = true;
    Vue.config.productionTip = false;
  }
}

/**
 * 配置自定义util库
 */
function configUtil() {
  Vue.prototype.$util = util;
}

export default {
  configVue,
  configUtil
};
