// app.extend bug

/**
 * 定义iModal对象
 */
function iModal(app) {
    this._app = app;
}

/**
 * 打开Modal
 * @param {Object,String} comp
 * comp类型为对象：组件选项对象
 * comp类型为字符串：组件路径。该路径基于@modal别名路径（在webpack中配置），根据路径异步导入组件
 * @param {Object} compDataObj
 * 组件数据对象 render函数中createElement的第二个参数
 * 详见：https://vue.docschina.org/v2/guide/render-function.html
 */
iModal.prototype.open = function(comp, compDataObj) {
    if(!comp) {
        throw '[iModal Error] 未定义组件值';
    }

    if(comp.constructor == Object) {
        this._mountiModalComponent(comp, compDataObj);
    }
    else if(typeof comp == 'string') {
        let compName = 'async-' + comp.replace(/[\/.]/g, '-');
        let asynciModalComponent = this._app.component(compName);
        if(!asynciModalComponent) {
            asynciModalComponent = this._app.component(compName, () => import('@modal/' + comp));
        }
        asynciModalComponent().then(res => {
            let iModalOptions = res.default;
            this._mountiModalComponent(iModalOptions, compDataObj);
        })
    }
}

iModal.prototype._mountiModalComponent = function(options, dataObj) {
    //定义Modal属性
    let iModalMixin = {
        data: function() {
            return {
                Modal: {
                    show: false
                }
            }
        },
        mounted: function() {
            this.Modal.show = true;
        },
        watch: {
            'Modal.show': function(val) {
                if(!val) {
                    this.Modal.close();
                }
            }
        }
    }
    if(options.mixins) {
        options.mixins.push(iModalMixin);
    }
    else {
        options.mixins = [iModalMixin]
    }

    let RenderComponent = this._app.extend({
        render: function(createElement) {
            return createElement(options, dataObj)
        }
    })
    let renderInstance = new RenderComponent().$mount();
    let iModalInstance = renderInstance.$children[0];

    // iModalInstance.Modal.$caller = this._vm;

    //定义close方法
    iModalInstance.Modal.close = function() {
        document.querySelector('body').removeChild(renderInstance.$el);
        renderInstance.$destroy();
    }

    document.querySelector('body').appendChild(renderInstance.$el);
}


export default iModal
