import Api from './source/Api';

/**
 * Vue调用插件
 * @param {*} Vue
 * @param {Object} options mode:common|restful
 */
const install = function (Vue, options = {}) {
  Api._setApiMode(options.mode || 'common');

  Vue.mixin({
    data() {
      return {
        Api: require('./reg').default,
      };
    },
  });
};

export default { install };
