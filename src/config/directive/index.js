import auth from '@/lib/auth'

// 资源文件
import loadingImg from './assets/loading.gif'

let app = null;

function regDirective(appInstance) {
    app = appInstance;

    loading();
    per();
}

// 鉴权指令
function per() {
    app.directive('per', {
        inserted: insertedOrUpdate,
        update: insertedOrUpdate
    })

    function insertedOrUpdate(el, binding) {
        if(binding.value != binding.oldValue) {
            let pers = auth.getPers();
            let hasPer = true;

            // 判断是否有权限
            let value = binding.value;
            if(typeof value === 'string') {
                hasPer = pers.indexOf(value) === -1 ? false : true;
            }
            else if(Array.isArray(value)) {
                for(let index = 0; index < value.length; index++) {
                    const item = value[index];
                    if(pers.indexOf(item) == -1) {
                        hasPer = false;
                        break;
                    }
                }
            }
            else {
                throw 'v-per指令参数类型错误'
            }

            // 没有权限的操作
            if(!hasPer) {
                let arg = binding.arg || 'hide';
                if(arg === 'hide') {
                    el.style.display = 'none';
                    el.innerHTML = '';
                }
                else if(arg === 'blur') {
                    el.style.visibility = 'hidden';
                    setTimeout(() => {
                        let elWidth = el.clientWidth;
                        let elHeight = el.clientHeight;
                        el.style.display = 'none';
                        el.style.visibility = 'visible';
                        el.style.width = elWidth + 'px';
                        el.style.height = elHeight + 'px';
                        el.style.position = 'relative';
                        el.innerHTML = `<div style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; background-color: white; opacity: 0.5; display: flex; justify-content: center; align-items: center; overflow: hidden;"><div style="font-size: 14px"><i class="el-icon-circle-close" style="margin-right: 5px"></i>无权限</div></div>`;
                        el.style.display = 'block';
                    }, 100)
                }
            }
        }
    }
}

// "加载中"指令
function loading() {
    app.directive('loading', {
        inserted: insertedOrUpdate,
        update: insertedOrUpdate
    })

    function insertedOrUpdate(el, binding) {
        if(typeof binding.value != 'boolean') {
            throw 'v-loading指令参数类型为Boolean'
        }

        if(binding.value != binding.oldValue) {
            let style = window.getComputedStyle(el);
            if(style.position == 'static') {
                el.style.position = 'relative'
            }
            if(binding.value) {
                let maskEl = document.createElement('div');
                maskEl.className = 'v-loading-dom';
                maskEl.style.width = '100%';
                maskEl.style.height = '100%';
                maskEl.style.backgroundColor = 'white';
                maskEl.style.position = 'absolute';
                maskEl.style.top = '0px';
                maskEl.style.left = '0px';
                maskEl.style.display = 'flex';
                maskEl.style.justifyContent = 'center';
                maskEl.style.alignItems = 'center';
                maskEl.style.overflow = 'hidden';
                maskEl.style.zIndex = '999';

                let imgEl = document.createElement('img');
                imgEl.src = loadingImg;

                maskEl.appendChild(imgEl);
                el.appendChild(maskEl)
            }
            else {
                let baseEl = el.querySelector('.v-loading-dom');
                if(baseEl) {
                    el.removeChild(baseEl);
                }
            }
        }
    }
}

export default regDirective
