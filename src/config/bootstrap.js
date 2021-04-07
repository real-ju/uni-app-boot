import store from '../store'
import router from '../router'

import VueWebStorage from 'vue-web-storage'
import api from '@/lib/api/plugin'
// import iModal from '@/lib/iModal/plugin'
// import regDirective from './directive'
// import regComponents from './components'
import axiosInstance from './axios'
// import Mock from 'mockjs'
// import mockConfig from './mock'
// import anime from 'animejs/lib/anime.es.js'
import util from '../lib/util'

let app = null;

/**
 * 配置Vue
 */
function configVue() {
    app.use(store);
    app.use(router);
    app.use(VueWebStorage, { prefix: `${process.env.VUE_APP_appID}_` });
    app.use(api);
    // app.use(iModal);

    // regDirective(app);
    // regComponents(app);
}

/**
 * 配置axios
 */
function configAxios() {
    app.config.globalProperties.$axios = axiosInstance;
}

/**
 * 配置mockjs
 */
function configMock() {
    mockConfig.forEach(item => {
        let re = new RegExp(`\\S+${item.api}\\S*`);
        Mock.mock(re, item.tpl)
    })
}

/**
 * 配置anime
 */
function configAnime() {
    app.config.globalProperties.$anime = anime;
}

/**
 * 配置自定义util库
 */
function configUtil() {
    app.config.globalProperties.$util = util;
}

function start(appInstance) {
    app = appInstance;

    configVue();

    // 配置第三方库
    configAxios();
    // configMock();
    // configAnime();
    configUtil();
}


export default {
    start
}
