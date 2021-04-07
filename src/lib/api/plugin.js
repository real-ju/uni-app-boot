import apis from './reg'

/**
 * Vue调用插件
 * @param {*} Vue 
 * @param {Object} options
 */
const install = function(Vue, options) {
    Vue.mixin({
        data() {
            return {
                Api: apis
            }
        }
    })
}

export default { install }