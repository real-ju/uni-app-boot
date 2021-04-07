import iModal from './source/iModal'

/**
 * Vue调用插件
 */
const install = function(app, options) {
    if(app.prototype.$Modal) {
        let instance = new iModal(app);
        app.prototype.$Modal.open = instance.open.bind(instance);
    }
    else {
        throw '请先安装iView';
    }
}

export default { install }
